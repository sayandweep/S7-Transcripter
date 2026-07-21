import sys
import json
from faster_whisper import WhisperModel

# Fix Windows Unicode console
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

print("1. Script started", flush=True)

audio_path = sys.argv[1]
print(f"2. Audio: {audio_path}", flush=True)

print("3. Loading model...", flush=True)

model = WhisperModel(
    "small",
    device="cpu",
    compute_type="int8"
)

print("4. Model loaded", flush=True)
print("5. Starting transcription...", flush=True)

segments, info = model.transcribe(
    audio_path,
    language="hi",          # Don't let it detect language
    task="transcribe",      # Don't auto-translate
    beam_size=5,            # Better decoding
    best_of=5,              # Better candidate selection
    temperature=0.0,        # Deterministic output
    vad_filter=True         # Remove silence/noise
)

print("6. Generator created", flush=True)
print(f"7. Language: {info.language}", flush=True)

count = 0
transcript = ""
segment_list = []

for segment in segments:
    count += 1
    print(f"8. Processed segment {count}", flush=True)

    segment_list.append({
        "start": segment.start,
        "end": segment.end,
        "text": segment.text
    })

    transcript += segment.text + " "

print(f"9. Total segments: {count}", flush=True)
print("10. Finished", flush=True)

result = {
    "success": True,
    "language": info.language,
    "transcript": transcript.strip(),
    "segments": segment_list
}

print("11. About to print JSON", flush=True)
print(json.dumps(result, ensure_ascii=False), flush=True)
import sys
import json
from faster_whisper import WhisperModel

print("1. Script started", flush=True)

audio_path = sys.argv[1]
print(f"2. Audio: {audio_path}", flush=True)

print("3. Loading model...", flush=True)

model = WhisperModel(
    "base",
    device="cpu",
    compute_type="int8"
)

print("4. Model loaded", flush=True)

print("5. Creating generator...", flush=True)

segments, info = model.transcribe(
    audio_path,
    beam_size=1,
    vad_filter=False
)

print("6. Generator created", flush=True)
print(f"7. Language: {info.language}", flush=True)

count = 0
transcript = ""
segment_list = []

for segment in segments:
    count += 1
    print(f"8. Segment {count}: {segment.text}", flush=True)

    transcript += segment.text + " "
    segment_list.append({
        "start": segment.start,
        "end": segment.end,
        "text": segment.text
    })

print(f"9. Total segments: {count}", flush=True)
print("10. Finished", flush=True)

result = {
    "language": info.language,
    "transcript": transcript.strip(),
    "segments": segment_list
}

print("11. About to print JSON", flush=True)
print(json.dumps(result))
import sys
import json
from faster_whisper import WhisperModel

sys.stdout.reconfigure(encoding="utf-8")

audio_path = sys.argv[1]

# model
model = WhisperModel(
    "small",
    device="cpu",
    compute_type="int8"
)

segments, info = model.transcribe(
    audio_path,
    beam_size=5,
    vad_filter=True
)
# model end

result = {
    "language": info.language,
    "transcript": "",
    "segments": []
}

for segment in segments:
    result["transcript"] += segment.text + " "
    result["segments"].append({
        "start": segment.start,
        "end": segment.end,
        "text": segment.text
    })

print(json.dumps(result, ensure_ascii=False))
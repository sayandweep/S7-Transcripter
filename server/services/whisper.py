import sys

print("1", flush=True)

from faster_whisper import WhisperModel

print("2", flush=True)

audio_path = sys.argv[1]

print(audio_path, flush=True)

print("3", flush=True)

model = WhisperModel(
    "base",
    device="cpu",
    compute_type="int8"
)

print("4", flush=True)

segments, info = model.transcribe(audio_path)

print("5", flush=True)

for _ in segments:
    print("segment", flush=True)

print("6", flush=True)
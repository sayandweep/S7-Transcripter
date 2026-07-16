from faster_whisper import WhisperModel

model = WhisperModel("base", device="cpu", compute_type="int8")

segments, info = model.transcribe("temp/a2d90ae2-bf16-4a07-bd41-9a294ab04d82.webm")

print("Language:", info.language)

for segment in segments:
    print(f"[{segment.start:.2f} -> {segment.end:.2f}] {segment.text}")
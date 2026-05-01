# IPRA AI Service

This project wraps the official HumanOmni inference code for the IPRA LLM module.

## Layout

- `vendor/HumanOmni-official/HumanOmni-main`: official HumanOmni source code.
- `app/check_env.py`: validates Python, CUDA, packages, model files, and vendor code.
- `app/download_deps.py`: downloads SigLIP, Whisper, and BERT into the project model cache.
- `app/infer_once.py`: one-shot HumanOmni inference smoke test.
- `app/service.py`: FastAPI skeleton for the next integration step.
- `app/compat/decord`: minimal Windows fallback for the `decord` API used by HumanOmni.

## Setup

PowerShell from repository root:

```powershell
py -m venv apps\ai-service\.venv
apps\ai-service\.venv\Scripts\python.exe -m pip install --upgrade pip
apps\ai-service\.venv\Scripts\python.exe -m pip install -r apps\ai-service\requirements.txt
```

Then check the environment:

```powershell
apps\ai-service\.venv\Scripts\python.exe apps\ai-service\app\check_env.py
```

Download dependency models if they are not already cached:

```powershell
apps\ai-service\.venv\Scripts\python.exe apps\ai-service\app\download_deps.py
```

Run a single inference:

```powershell
apps\ai-service\.venv\Scripts\python.exe apps\ai-service\app\infer_once.py `
  --modal video `
  --video-path apps\ai-service\samples\smoke.mp4 `
  --instruct "Describe the person and visible emotional state in this video."
```

For `video_audio`, use a video file that contains an audio track.

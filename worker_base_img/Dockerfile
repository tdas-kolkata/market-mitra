FROM python:3.12.11-slim

WORKDIR /app
RUN apt-get update && apt-get install -y git
# Install uv (fast dependency resolver/installer)
RUN pip install --upgrade pip && pip install uv

# Copy only dependency files first (for better caching)
COPY pyproject.toml uv.lock ./

# Install dependencies from lock file
RUN uv pip install --system .

# For Prefect 3.x (workers)
CMD ["prefect", "worker", "start", "-p", "etl-workers"]

# For Prefect 2.x (agents, if needed)
# CMD ["prefect", "agent", "start", "-q", "etl-workers"]




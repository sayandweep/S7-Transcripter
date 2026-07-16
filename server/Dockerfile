FROM node:22-bookworm

# Install Python, pip and FFmpeg
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install Node dependencies
RUN npm install

# Copy Python requirements
COPY requirements.txt ./

# Install Python dependencies
RUN pip3 install --break-system-packages -r requirements.txt

# Copy the rest of the project
COPY . .

EXPOSE 10000

CMD ["npm", "start"]
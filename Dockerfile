
# Start from golang base image
FROM golang:alpine as go_builder

# Install git to fetch dependencies
RUN apk update && apk add --no-cache git

# Set the current working directory inside the container 
WORKDIR /app/server

# Copy go mod and sum files 
COPY server/go.mod server/go.sum ./

# Download all dependencies.
# Dependencies will be cached if the go.mod and the go.sum files are not changed 
RUN go mod download 

# Set the current working directory
WORKDIR /app

# Copy the source from the current directory to the working Directory inside the container 
COPY server server

# Set the current working directory
WORKDIR /app/server

# Build the Go app
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o server .

# New stage, build React app
FROM node:alpine as node_builder
WORKDIR /app
COPY client client
WORKDIR /app/client
RUN npm ci
RUN npm run build

# New stage, copy prod depdencies and run server binary
FROM alpine:latest
RUN apk --no-cache add ca-certificates

WORKDIR /root/

# Copy the Pre-built binary file from the previous stage.
# Observe we also copied the .env file
COPY --from=go_builder /app/server/server .
COPY --from=node_builder /app/dist ./dist

# Command to run the executable
CMD ["./server"]

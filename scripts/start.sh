#!/bin/bash
set -Eeuo pipefail

COZE_WORKSPACE_PATH="${COZE_WORKSPACE_PATH:-$(pwd)}"

PORT=5000
DEPLOY_RUN_PORT="${DEPLOY_RUN_PORT:-$PORT}"

# 在后台安装Python数据分析依赖（不阻塞启动）
install_python_deps() {
    echo "Installing Python dependencies for data analysis in background..."
    nohup pip3 install -q numpy pandas matplotlib scipy scikit-learn > /tmp/python_deps_install.log 2>&1 &
    echo "Python dependencies installation started in background."
}

start_service() {
    cd "${COZE_WORKSPACE_PATH}"
    install_python_deps
    echo "Starting HTTP service on port ${DEPLOY_RUN_PORT} for deploy..."
    PORT=${DEPLOY_RUN_PORT} node dist/server.js
}

echo "Starting HTTP service on port ${DEPLOY_RUN_PORT} for deploy..."
start_service

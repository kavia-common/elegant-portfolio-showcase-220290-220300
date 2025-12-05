#!/bin/bash
cd /home/kavia/workspace/code-generation/elegant-portfolio-showcase-220290-220300/portfolio_backend
npm run lint
LINT_EXIT_CODE=$?
if [ $LINT_EXIT_CODE -ne 0 ]; then
  exit 1
fi


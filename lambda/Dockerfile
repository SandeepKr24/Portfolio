FROM public.ecr.aws/lambda/nodejs:20

COPY package.json ${LAMBDA_TASK_ROOT}/
RUN npm install --omit=dev

COPY handler.mjs ${LAMBDA_TASK_ROOT}/

CMD ["handler.handler"]

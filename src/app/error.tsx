'use client';

// Error components must be Client Components
// https://nextjs.org/docs/app/api-reference/file-conventions/error
import Box from '@/components/commons/Box';

const Error = () => {
  return (
    <Box className="h-full flex items-center justify-center">
      <div className="text-neutral-400">Something went wrong.</div>
    </Box>
  );
};

export default Error;

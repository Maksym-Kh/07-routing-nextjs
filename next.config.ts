/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/notes",
        destination: "/notes/filter/all",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;

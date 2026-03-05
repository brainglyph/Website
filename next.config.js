/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/pitchdeck',
        destination: 'https://www.figma.com/deck/mywjSzASueyMwqijQHbwao/Heli.os---Public-Pitch-Deck',
        permanent: true,
      },
    ];
  },
}
 
module.exports = nextConfig
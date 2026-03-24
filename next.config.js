/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/pitchdeck',
        destination: 'https://www.figma.com/deck/mywjSzASueyMwqijQHbwao/Heli.os---Public-Pitch-Deck',
        permanent: true,
      },
      {
        source: '/investordeck',
        destination: 'https://www.figma.com/deck/GxAn7wldqCeg0hgMIEjP9E/Heli.os---Investor-Standalone-Deck',
        permanent: true,
      }
    ];
  },
}
 
module.exports = nextConfig
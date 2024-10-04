import PortfolioClientComponent from '@/components/portfolio/PortfolioClientComponent';
import prisma from '@/lib/prisma'; // Ensure the correct path

export default async function PortfolioPage({ params }: { params: { address: string } }) {
  const { address } = params;

  // Fetch the user data server-side
  const user = await prisma.user.findUnique({
    where: { accountAddress: address },
    include: {
      userInfo: true,
      songs: true,
    },
  });

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <PortfolioClientComponent user={user} />
  );
}

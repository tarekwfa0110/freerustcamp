import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { getChallenge, getSectionById } from '@/data/challenges';
import { ChallengeView } from '@/components/ChallengeView';

// @ts-expect-error - TanStack Router file-based routing types
export const Route = createFileRoute('/challenges/$challengeId')({
  component: ChallengePage,
});

function ChallengePage() {
  const { challengeId } = Route.useParams();
  const navigate = useNavigate();
  const result = getChallenge(challengeId);

  // Check if it's a section ID (numeric string) and redirect to first challenge
  useEffect(() => {
    const sectionNum = parseInt(challengeId, 10);
    if (!isNaN(sectionNum) && sectionNum.toString() === challengeId && !result) {
      const section = getSectionById(sectionNum);
      if (section && section.challenges.length > 0) {
        navigate({
          to: '/challenges/$challengeId',
          params: { challengeId: section.challenges[0].id },
          replace: true,
        });
      }
    }
  }, [challengeId, result, navigate]);

  // Show loading while redirecting
  const sectionNum = parseInt(challengeId, 10);
  if (!isNaN(sectionNum) && sectionNum.toString() === challengeId && !result) {
    const section = getSectionById(sectionNum);
    if (section && section.challenges.length > 0) {
      return (
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-gray-400">Redirecting to first challenge...</p>
          </div>
        </div>
      );
    }
  }

  if (!result) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Challenge Not Found</h1>
          <p className="text-gray-400">The challenge you're looking for doesn't exist.</p>
          <a
            href="/challenges"
            className="mt-4 inline-block text-orange-500 hover:text-orange-400"
          >
            ← Back to Challenges
          </a>
        </div>
      </div>
    );
  }

  return <ChallengeView challenge={result.challenge} section={result.section} />;
}

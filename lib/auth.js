import 'server-only';
import { currentUser } from '@clerk/nextjs/server';

export async function getAuthenticatedUser() {
  const user = await currentUser();
  if (!user) {
    throw new Error('Unauthorized');
  }
  const email = user.primaryEmailAddress?.emailAddress || user.emailAddresses?.[0]?.emailAddress;
  if (!email) {
    throw new Error('Unauthorized: User has no email address');
  }
  return { user, email, userId: user.id };
}

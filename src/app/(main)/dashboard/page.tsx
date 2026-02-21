import React from 'react';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

import { cookies } from 'next/headers';
// defer importing the DB so runtime failures can be caught
import { redirect } from 'next/navigation';
import DashboardSetup from '@/components/dashboard-setup/dashboard-setup';
import { getUserSubscriptionStatus } from '@/lib/supabase/queries';

const DashboardPage = async () => {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  let workspace = null;
  try {
    const { default: db } = await import('@/lib/supabase/db');
    workspace = await db.query.workspaces.findFirst({
      where: (workspace, { eq }) => eq(workspace.workspaceOwner, user.id),
    });
  } catch (err) {
    // log and continue gracefully — avoid crashing server render
    // eslint-disable-next-line no-console
    console.error('DashboardPage DB error:', err);
    // if DB is unavailable, fall back to redirecting to a safe route
    // or render the setup component without workspace
    workspace = null;
  }

  const { data: subscription, error: subscriptionError } =
    await getUserSubscriptionStatus(user.id);

  if (subscriptionError) return;

  if (!workspace)
    return (
      <div
        className="bg-background
        h-screen
        w-screen
        flex
        justify-center
        items-center
  "
      >
        <DashboardSetup
          user={user}
          subscription={subscription}
        />
      </div>
    );

  redirect(`/dashboard/${workspace.id}`);
};

export default DashboardPage;

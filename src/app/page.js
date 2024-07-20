'use client'

import ProtectedRoute from '@/components/ProtectedRoute';
import Header from '../components/header/index'

export default function Home() {
  return (
    <main>
      <ProtectedRoute>
        <Header/>
      </ProtectedRoute>

    </main>
  );
}

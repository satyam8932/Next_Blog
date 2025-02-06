'use client'
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import StepForm from '@/components/StepForm';

export default function Home() {
  return (
    <>
    <Navbar />
    <main className="min-h-screen">
      <StepForm />
    </main>
    <Footer />
    </>
  );
}
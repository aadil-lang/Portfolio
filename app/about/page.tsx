import { redirect } from 'next/navigation'

export const metadata = {
  title: 'About | Mohemmed Aadil Khurshid — AI Systems Engineer',
  description: 'The reflective engineering story and foundational background of Mohemmed Aadil Khurshid.'
}

export default function AboutPage() {
  redirect('/journal')
}

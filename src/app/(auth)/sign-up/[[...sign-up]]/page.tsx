import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className='min-h-[80vh] flex justify-center items-center'>
        <SignUp />
    </div>
  )
}
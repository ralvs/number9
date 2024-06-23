import Link from 'next/link'

export default function NotFound() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh',
        textAlign: 'center',
      }}
    >
      <h3>Please, go home, you're lost!</h3>
      <Link href='/'>Click here, Sr.</Link>
    </div>
  )
}

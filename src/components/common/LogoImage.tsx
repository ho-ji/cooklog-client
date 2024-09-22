import Image from 'next/image'
import Link from 'next/link'

interface LogoImageProps {
  w: number
  h: number
}

const LogoImage = ({w, h}: LogoImageProps) => {
  return (
    <Link href="/">
      <Image
        src="/images/logo.png"
        alt="Cook Log"
        width={w}
        height={h}
        priority
      />
    </Link>
  )
}

export default LogoImage

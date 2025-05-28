import Featured from '@/components/Featured'
import Offer from '@/components/Offer'
import Slider from '@/components/Slider'

export default function Home() {
  return (
    // new meondb database added and migration added
    <main>
      <Slider/>
      <Featured/>
      <Offer/>
    </main>
  )
}

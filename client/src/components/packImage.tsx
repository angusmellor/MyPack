import packImgUrl from "../assets/backpack.png";
import { cn } from "../lib/utils";
import { useEffect } from "react";

const colorPalette = [ 'bg-custBlue', 'bg-custBlue2', 'bg-custGreen', 'bg-custPink', 'bg-custPurp', 'bg-custBrown', 'bg-custOrng']

const showPackColours = (ratios: number[] ) => {
  ratios.forEach((ratio, i) => {
    console.log(ratio)
    const height = ratio * 160;
    let sum = 0;
    ratios.slice(0,i).forEach( num => {
      sum += num;
    })
    const position = sum * 160;
    document.getElementById(`${i}`)!.style.height = height + 'px';
    document.getElementById(`${i}`)!.style.top = position + 'px';
  })
}

type PackImageProps = {
  ratios: number[]
}

export function PackImage ({ratios}: PackImageProps) {

  useEffect(() => {
    showPackColours(ratios)
  })

  return (
    <div className=" relative">
      {ratios.map((rat, i) => {
        return <div key={i} id={`${i}`} className={cn('w-[114px] -z-10 absolute', colorPalette[i])}></div>
      })}
      <img src={packImgUrl} className=" h-[161px] min-w-min"></img>
    </div>
  )
}

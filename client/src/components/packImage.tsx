import packImgUrl from "../assets/backpack.png";
import { cn } from "../lib/utils";
import { useEffect } from "react";

const colorPalette = [ 'bg-custBlue', 'bg-custBlue2', 'bg-custGreen', 'bg-custPink', 'bg-custPurp', 'bg-custBrown', 'bg-custOrng']

const showPackColours = (ratios: number[] ) => {
  ratios.forEach((ratio, i) => {
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

export function PackImage () {
  
  const ratios = [0.2, 0.35, 0.1, 0.2, 0.15];

  useEffect(() => {
    showPackColours(ratios)
  })

  return (
    <div className=" relative">
      {ratios.map((rat, i) => {
        return <div id={`${i}`} className={cn('w-[114px] -z-10 absolute', colorPalette[i])}></div>
      })}
      <img src={packImgUrl} className=" h-40 min-w-min"></img>
    </div>
  )
}

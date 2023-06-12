import packImgUrl from "../assets/backpack.png";
import { cn } from "../lib/utils";
import { useEffect } from "react";

const colorPalette = [ 'bg-custBlue', 'bg-custBlue2', 'bg-custGreen', 'bg-custPink', 'bg-custPurp', 'bg-custBrown', 'bg-custOrng']

const showPackColours = (ratios: number[], packId: number ) => {
  ratios.forEach((ratio, i) => {
    const height = ratio * 160;
    let sum = 0;
    ratios.slice(0,i).forEach( num => {
      sum += num;
    })
    const position = sum * 160;
    document.getElementById(String(packId) + colorPalette[i])!.style.height = height + 'px';
    document.getElementById(String(packId) + colorPalette[i])!.style.top = position + 'px';
  })
}

type PackImageProps = {
  ratio: number[]
  packId: number
}

export function PackImage ({ratio, packId}: PackImageProps) {

  useEffect(() => {
    showPackColours(ratio, packId)
  })



  return (
    <div className=" relative">
      {ratio.map((rat, i) => {
        console.log(ratio, packId)
        return <div key={`${packId}, ${i}` } id={String(packId) + colorPalette[i]} className={cn('w-[114px] -z-10 absolute', colorPalette[i])}></div>
      })}
      <img src={packImgUrl} className=" h-[161px] min-w-min"></img>
    </div>
  )
}

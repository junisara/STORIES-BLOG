import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import dayjs from 'dayjs'

// import { cn } from "@/lib/utils";
// <div className={cn("mt-4 border bg-popover p-1", className )} />
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function timeFormat(time: string | dayjs.Dayjs) {
  const now = dayjs()
  const seconds = now.diff(time, 'second')
  const minutes = now.diff(time, 'minute')
  const hours = now.diff(time, 'hour')
  const days = now.diff(time, 'day')

  if (seconds < 60) {
    return `${seconds}초 전`
  } else if (minutes < 60) {
    return `${minutes}분 전`
  } else if (hours < 24) {
    return `${hours}시간 전`
  } else if (days < 30) {
    return `${days}일 전`
  } else {
    return dayjs(time).format('YYYY년 MM월 DD일')
  }
}

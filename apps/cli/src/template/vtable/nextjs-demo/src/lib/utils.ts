import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function addThousandsSeparator(num: number) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function numberToPercentage(num: number) {
  return `${num * 100}%`;
}

// 将 Date 转换为 "April 2024" 格式
export function formatMonthYear(date: Date) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = months[date.getMonth()]; // 获取月份名称
  const year = date.getFullYear(); // 获取四位年份
  return `${month} ${year}`;
}

// 将 Date 转换为 "Monday 22" 格式
export function formatWeekdayDay(date: Date) {
  const weekdays = ["S", "M", "T", "W", "T", "F", "S"];
  const weekday = weekdays[date.getDay()]; // 获取星期名称
  const day = date.getDate(); // 获取日期（1-31）
  return `${weekday} ${day}`;
}

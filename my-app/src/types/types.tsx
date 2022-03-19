
interface IpageType{
  link: string,
  name: string,
  icon: React.ReactNode
}
export interface IpageProps{
  page: IpageType[] 
}
export type Anchor = 'top' | 'left' | 'bottom' | 'right';

export interface INavDraver{
  state: Istate,
  pages: IpageProps,
  toggleDrawer : (anchor: Anchor, open: boolean) => any
}
export  interface Istate{
        top: boolean,
        left: boolean,
        bottom: boolean,
        right: boolean
}
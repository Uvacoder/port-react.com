import { mdiClose, mdiLogout } from '@mdi/js'
import React from 'react'

import { iAppState, useAppStore } from '../../core/store'
import { MenuAsideItem } from '../../interfaces'
import BaseIcon from '../Icon/BaseIcon'
import AsideMenuItem from './AsideMenuItem'
import AsideMenuList from './AsideMenuList'

type Props = {
  menu: MenuAsideItem[]
  className?: string
  onAsideLgCloseClick: () => void
}

export default function AsideMenuLayer({
  menu,
  className = '',
  ...props
}: Props) {
  const styleState = useAppStore((state: iAppState) => state.style)
  const darkMode = useAppStore((state: iAppState) => state.darkMode)

  const asideStyle = styleState.asideStyle
  const asideBrandStyle = styleState.asideBrandStyle
  const asideScrollbarsStyle = styleState.asideScrollbarsStyle

  const logoutItem: MenuAsideItem = {
    label: 'Logout',
    icon: mdiLogout,
    color: 'info',
    isLogout: true,
  }

  const handleAsideLgCloseClick = (e: React.MouseEvent) => {
    e.preventDefault()
    props.onAsideLgCloseClick()
  }

  return (
    <aside
      className={`${className} zzz lg:py-2 lg:pl-2 w-60 fixed flex z-40 top-0 h-screen transition-position overflow-hidden`}
    >
      <div
        className={`lg:rounded-md flex-1 flex flex-col overflow-hidden dark:bg-slate-900 ${asideStyle}`}
      >
        <div
          className={`flex flex-row h-14 items-center justify-between dark:bg-slate-900 ${asideBrandStyle}`}
        >
          <div className='text-center flex-1 lg:text-left lg:pl-6 xl:text-center xl:pl-0'>
            <b className='font-black'>One</b>
          </div>
          <button
            className='hidden lg:inline-block xl:hidden p-3'
            onClick={handleAsideLgCloseClick}
          >
            <BaseIcon path={mdiClose} />
          </button>
        </div>
        <div
          className={`flex-1 overflow-y-auto overflow-x-hidden ${
            darkMode ? 'aside-scrollbars-[slate]' : asideScrollbarsStyle
          }`}
        >
          <AsideMenuList menu={menu} />
        </div>
        <ul>
          <AsideMenuItem item={logoutItem} />
        </ul>
      </div>
    </aside>
  )
}
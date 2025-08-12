import React from 'react'
import { Link } from 'react-router-dom'
import { IoIosSearch } from "react-icons/io";
import { FaRegUser } from "react-icons/fa6";
import { FcMenu } from "react-icons/fc";
import { IoMdHeartEmpty } from "react-icons/io";
import { BsBagDash } from "react-icons/bs";
import starIcon from '../../assets/Topsales.png'

const categories: string[] = [
  'Товары недели',
  'Электроника',
  'Бытовая техника',
  'Одежда',
  'Обувь',
  'Аксессуары',
  'Красота и уход',
  'Здоровье',
  'Товары для дома',
  'Строительство и ремонт',
  'Ещё',
]

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-[1000] w-full bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-16 flex items-center gap-4 sm:gap-6">
          <Link to="/" className="flex items-center gap-2 shrink-0 cursor-pointer" aria-label="Uzum Market home">
            <span className="relative inline-flex items-center justify-center w-8 h-8 rounded-full bg-yellow-300 text-purple-700 font-extrabold text-lg select-none">U</span>
            <span className="text-2xl font-semibold text-purple-700 tracking-tight">uzum <span className="text-gray-900">market</span></span>
          </Link>

          <button type="button" className="hidden md:inline-flex items-center gap-2 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors px-4 py-2">
            <FcMenu className="w-5 h-5" />
            <span className="font-medium">Каталог</span>
          </button>

          <div className="flex-1 min-w-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Искать товары и категории"
                className="w-full rounded-lg border border-gray-200 bg-white pl-4 pr-12 py-2.5 outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-[15px]"
                aria-label="Поиск"
              />
              <button aria-label="Search" className="absolute inset-y-0 right-0 px-3 text-gray-500 hover:text-gray-700">
                  <IoIosSearch className="w-5 h-5" />
                </button>
            </div>
          </div>

          <nav className="hidden sm:flex items-center gap-6 text-gray-800">
            <Link to="/login" className="inline-flex items-center gap-2 hover:text-purple-700">
              <FaRegUser className="w-5 h-5" />
              <span className="text-[15px]">Войти</span>
            </Link>

            <Link to="/wishlist" className="inline-flex items-center gap-2 hover:text-purple-700">
              <IoMdHeartEmpty className="w-5 h-5" />
              <span className="text-[15px]">Избранное</span>
            </Link>

            <Link to="/cart" className="inline-flex items-center gap-2 hover:text-purple-700">
              <BsBagDash className="w-5 h-5" />
              <span className="text-[15px]">Корзина</span>
            </Link>
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-6 h-12 text-gray-700">
          {categories.map((category, index) => (
            <Link
              key={category}
              to={index === 0 ? '/' : `/category/${encodeURIComponent(category)}`}
              className={`text-sm hover:text-purple-700 whitespace-nowrap ${index === 0 ? 'font-semibold inline-flex items-center gap-2 text-gray-900' : ''}`}
            >
              {index === 0 && <img src={starIcon} alt="star" className="w-5 h-5 text-purple-600" />}
              {category}
            </Link>
          ))}
        </div>
      </div>
    </header>
  )
}

export default React.memo(Header)



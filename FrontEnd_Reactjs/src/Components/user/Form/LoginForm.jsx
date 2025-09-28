import { IoMdCloseCircleOutline } from "react-icons/io";
import { BiHide } from "react-icons/bi";

export default function LoginForm({onClose}) {
  return (
    <>
      <div className="fixed inset-0 flex items-start justify-center bg-black/50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-2/8">
          <div className="w-full flex flex-row justify-end">
            <button onClick={onClose} className="cursor-pointer">
              <IoMdCloseCircleOutline size={30} className="text-gray-500" />
            </button>
          </div>
          <div className="w-full flex flex-row items-center justify-center">
            <h2 className="font-bold text-[30px]">Login</h2>
          </div>
          <form className="w-full bg-white rounded-sm border-gray-500 min-h-2/3 px-10 flex flex-col pb-5">
            <div className="input-group flex flex-col">
              <label htmlFor="" className="font-bold text-gray-600 mb-2">
                Số điện thoại
              </label>
              <input
                type="text"
                className="border-1 border-gray-300 rounded-lg h-12 px-5 text-[22px] text-gray-700"
              />
              <span className="block errorMess text-sm text-red-500 min-h-[20px]"></span>
            </div>

            <div className="flex flex-col input-group">
              <label htmlFor="" className="font-bold text-gray-600 mb-2">
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full border-1 border-gray-300 rounded-lg h-12 px-5 pe-10 text-[22px] text-gray-700"
                />
                <span className="text-gray-600 absolute inset-y-0 flex items-center right-5">
                  <button>
                    <BiHide />
                  </button>
                </span>
              </div>
              <span className="block errorMess text-sm text-red-500 min-h-[20px]"></span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

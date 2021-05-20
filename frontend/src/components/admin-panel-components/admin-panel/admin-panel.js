import React, {Fragment, useContext, useEffect, useState} from 'react'
import {
    AcademicCapIcon,
    AdjustmentsIcon,
    BookOpenIcon,
    ChartSquareBarIcon, ChevronRightIcon, CollectionIcon,
    HomeIcon,
    LogoutIcon, PlusCircleIcon, RefreshIcon, TableIcon, TrashIcon,
    UserCircleIcon,
    UserIcon
} from "@heroicons/react/outline";
import {
    BsBook,
    BsCardList,
    BsList, FaUserCircle, GiOpenBook,
    GrClose,
    HiOutlineDatabase, IoMdSchool, IoSchoolOutline,
    MdPermContactCalendar, MdViewModule,
    TiContacts
} from "react-icons/all";
import { Menu,Transition } from '@headlessui/react'
import {Link, Redirect} from "react-router-dom";
import CoursesApi from "../../api";
import Spinner from "../../main-page-components/spinner";
import AuthService from "../../auth-service";
import {AppContext} from "../../../stateManager";


export default function AdminPanel() {
    const { appState } = useContext(AppContext)
    const {isAuthorized, userData} = appState
    const [show, setShow] = useState(false)
    const [tab, setTab] = useState('stats')
    const [activeTab, setActiveTab] = useState(0)
    const [activeAction, setActiveAction] = useState(null)

    let api = new CoursesApi()
    let authService = new AuthService()
    const [users, setUsers] = useState(null);
    const [courses, setCourses] = useState(null);
    const [modules, setModules] = useState(null);
    const [lessons, setLessons] = useState(null);
    const [isAdmin, setIsAdmin] = useState(null)

    useEffect(()=>{
        if (users === null && courses === null && modules === null && lessons === null) {
            api.getAllUsers().then(data=>{
                setUsers(data)
            })
            api.getAllCourses().then(data=>{
                setCourses(data)
            })
            api.getAllModules().then(data=>{
                setModules(data)
            })
            api.getAllLessons().then(data=>{
                setLessons(data)
            })
        }
    }, [users, courses, modules, lessons])
    useEffect(()=>{
        if (isAdmin === null) {
            (
                async () => {
                    await authService.IsAdmin().then(json=>{
                        console.log(json)
                        if (json.message === 'User is admin'){
                            setIsAdmin(true)
                        } else {
                            setIsAdmin(false)
                        }
                    })
                }
            )()
        }
    }, [isAdmin])

    if (isAdmin === null) {
        return <Spinner/>
    }
    else {
        if (isAdmin !== true) {
            return <Redirect to="*"/>
        }
    }


    let toggleShow = () => {
        setShow(!show);
    }

    let openForm = (type) => {
        if (type === 'add') {
            setActiveAction('add');
        }
        if (type === 'delete') {
            setActiveAction('delete');
        }
        if (type === 'update') {
            setActiveAction('update');
        }
    }

    if (!users || !modules || !courses || !lessons) {
        return <Spinner/>
    }

    let usersTableItems = users.map(elem=>{
        return (
            <tr className="bg-gray-100 border-b border-gray-200">
                <td className="px-4 py-3">{elem.userId}</td>
                <td className="px-4 py-3">{elem.userName}</td>
                <td className="px-4 py-3">{elem.userSurname}</td>
                <td className="px-4 py-3">{elem.userEmail}</td>
                <td className="px-4 py-3">{elem.userLogin}</td>
            </tr>
        )
    })
    let coursesTableItems = courses.map(elem=>{
        return (
            <tr className="bg-gray-100 border-b border-gray-200">
                <td className="px-4 py-3">{elem.courseId}</td>
                <td className="px-4 py-3">{elem.courseLessons}</td>
                <td className="px-4 py-3">{elem.courseImage}</td>
                <td className="px-4 py-3">{elem.courseTitle}</td>
                <td className="px-4 py-3">{elem.courseDesc}</td>
                <td className="px-4 py-3">{elem.courseReqs}</td>
                <td className="px-4 py-3">{elem.courseAdv}</td>
            </tr>
        )
    })
    let modulesTableItems = modules.map(elem=>{
        return (
            <tr className="bg-gray-100 border-b border-gray-200">
                <td className="px-4 py-3">{elem.moduleId}</td>
                <td className="px-4 py-3">{elem.moduleTitle}</td>
                <td className="px-4 py-3">{elem.moduleCourseId}</td>
                <td className="px-4 py-3">{elem.moduleNumberOfLessons}</td>
            </tr>
        )
    })
    let lessonsTableItems = lessons.map(elem=>{
        return (
            <tr className="bg-gray-100 border-b border-gray-200">
                <td className="px-4 py-3">{elem.lessonId}</td>
                <td className="px-4 py-3">{elem.lessonType}</td>
                <td className="px-4 py-3">{elem.lessonModuleId}</td>
                <td className="px-4 py-3">{elem.lessonTitle}</td>
                <td className="px-4 py-3">{elem.lessonLink}</td>
                <td className="px-4 py-3">{elem.lessonContent}</td>
            </tr>
        )
    })

    function submitUser(type, data) {
        if (type === 'add'){

        }
    }

    function submitCourse() {
        return undefined;
    }

    return (
        <>
            {/*Navbar*/}
            <section className="h-16 bg-gray-100 shadow-md pl-72 pr-52 items-center relative flex justify-between">
                <div className="flex relative items-center">
                    <div className="mr-10 cursor-pointer" onClick={()=>{toggleShow()}}>
                        <button className={`${!show ? `hidden`: ``} flex items-center focus:outline-none ring-blue-500 transition-opacity transition-1000 active:opacity-0 opacity-100`}>
                            <BsList className="w-9 h-9"/>
                        </button>
                        <button className={`${show ? `hidden`: ``} flex items-center focus:outline-none ring-blue-500 transition-opacity transition-1000 active:opacity-0 opacity-100`}>
                            <GrClose className="w-9 h-9"/>
                        </button>
                    </div>
                    <h1 className="text-gray-900 font-bold text-2xl">ADMIN PANEL</h1>
                </div>
                <div className="flex relative">
                    <div className="flex">
                        <div className="relative inline-block text-left">
                            <Menu>
                                {({ open }) => (
                                    <>
                                        <Menu.Button className="focus:outline-none inline-flex justify-center w-full">
                                            <button className="hover:bg-blue-600 focus:ring-2 transition flex items-center text-gray-50 relative focus:outline-none px-5 py-2 bg-blue-500 rounded-lg">
                                                        <span className="text-md mr-1 font-bold">
                                                            {userData.name}
                                                        </span>
                                                <UserCircleIcon className="inline w-7 h-7"/>
                                            </button>
                                        </Menu.Button>

                                        <Transition
                                            show={open}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items static className="absolute right-0 w-56 mt-2 origin-top-right bg-gray-800 text-white mt-4 divide-y divide-gray-100 rounded-md shadow-xl outline-none">
                                                <div className="py-1">
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <Link
                                                                to="/profile/"
                                                                className={`${
                                                                    active
                                                                        ? "bg-gray-100 text-gray-900"
                                                                        : "text-white"
                                                                } flex mx-4 rounded my-2 px-4 py-2 font-medium text-sm leading-5`}
                                                            >
                                                                <UserIcon className="w-5 h-5 inline mr-2"/>
                                                                Your profile
                                                            </Link>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <Link
                                                                to="/settings/"
                                                                className={`${
                                                                    active
                                                                        ? "bg-gray-100 text-gray-900"
                                                                        : "text-white"
                                                                } flex mx-4 rounded my-2 px-4 py-2 font-medium text-sm leading-5`}
                                                            >
                                                                <AdjustmentsIcon className="w-5 h-5 inline mr-2"/>
                                                                Settings
                                                            </Link>
                                                        )}
                                                    </Menu.Item>
                                                    <hr className="mx-7"/>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <a
                                                                href="/logout/"
                                                                className={`${
                                                                    active
                                                                        ? "bg-gray-100 text-gray-900"
                                                                        : "text-white"
                                                                } flex mx-4 rounded my-2 px-4 py-2 font-medium text-sm leading-5`}
                                                            >
                                                                <LogoutIcon className="w-5 h-5 inline mr-2"/>
                                                                Sign out
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                </div>
                                            </Menu.Items>
                                        </Transition>
                                    </>
                                )}
                            </Menu>
                        </div>
                    </div>
                </div>
            </section>
            {/*Main page*/}
            <div className="pl-72 pt-10">
                <div className={`${tab === 'stats' ? `` : `hidden`} stats`}>
                    <h1 className="text-3xl text-gray-900 font-bold ">Statistics</h1>
                    <div className="w-5/6">
                        <div className="grid grid-cols-4 gap-4 mt-10">
                            <div className="px-8 py-5 bg-blue-500 text-white font-bold rounded-lg text-2xl">
                                <span>Users</span>
                                <div className="mt-3 flex items-center text-3xl">
                                    <FaUserCircle className="w-10 h-10 mr-2"/>
                                    <span>{users.length}</span>
                                </div>
                            </div>
                            <div className="px-8 py-5 bg-green-500 text-white font-bold rounded-lg text-2xl">
                                <span>Courses</span>
                                <div className="mt-3 flex items-center text-3xl">
                                    <GiOpenBook className="w-10 h-10 mr-2"/>
                                    <span>{courses.length}</span>
                                </div>
                            </div>
                            <div className="px-8 py-5 bg-yellow-500 text-white font-bold rounded-lg text-2xl">
                                <span>Modules</span>
                                <div className="mt-3 flex items-center text-3xl">
                                    <MdViewModule className="w-10 h-10 mr-2"/>
                                    <span>{modules.length}</span>
                                </div>
                            </div>
                            <div className="px-8 py-5 bg-red-500 text-white font-bold rounded-lg text-2xl">
                                <span>Lessons</span>
                                <div className="mt-3 flex items-center text-3xl">
                                    <IoMdSchool className="w-10 h-10 mr-2"/>
                                    <span>{lessons.length}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10">
                        <div className="px-8 py-3 bg-white border-2 border-blue-500 w-5/6 rounded-lg shadow-lg mt-3">
                            <h1 className="text-2xl font-bold text-blue-500">Users purchased 12 courses</h1>
                        </div>
                        <div className="px-8 py-3 bg-white border-2 border-blue-500 w-5/6 rounded-lg shadow-lg mt-3">
                            <h1 className="text-2xl font-bold text-blue-500">12 users rated courses</h1>
                        </div>
                        <div className="px-8 py-3 bg-white border-2 border-blue-500 w-5/6 rounded-lg shadow-lg mt-3">
                            <h1 className="text-2xl font-bold text-blue-500">Last week purchased 12 courses</h1>
                        </div>
                    </div>
                </div>
                <div className={`${tab === 'tables' ? `` : `hidden`} tables`}>
                    <h1 className="text-3xl text-gray-900 font-bold flex items-center">
                        Tables
                        <ChevronRightIcon className="w-10 h-10 mx-3"/>
                        {activeTab === 0 ? 'Users': ''}
                        {activeTab === 1 ? 'Courses': ''}
                        {activeTab === 2 ? 'Modules': ''}
                        {activeTab === 3 ? 'Lessons': ''}
                    </h1>
                    {/*Buttons*/}
                    <div className="mt-10">
                        <div className="flex justify-start">
                            <div className="block mr-2">
                                <button onClick={()=>setActiveTab(0)} className={`${activeTab === 0 ? `bg-white text-gray-900` : `bg-gray-900 text-white hover:bg-gray-700 transition hover:border-gray-700`} focus:outline-none border-4 border-gray-900 flex items-center px-8 py-3 rounded-lg font-bold`}>
                                    <UserIcon className="w-5 h-5 mr-2"/>
                                    <span>Users</span>
                                </button>
                            </div>
                            <div className="block mr-2">
                                <button onClick={()=>setActiveTab(1)} className={`${activeTab === 1 ? `bg-white text-gray-900` : `bg-gray-900 text-white hover:bg-gray-700 transition hover:border-gray-700`} focus:outline-none border-4 border-gray-900 flex items-center px-8 py-3 rounded-lg font-bold`}>
                                    <BookOpenIcon className="w-5 h-5 mr-2"/>
                                    <span>Courses</span>
                                </button>
                            </div>
                            <div className="block mr-2">
                                <button onClick={()=>setActiveTab(2)} className={`${activeTab === 2 ? `bg-white text-gray-900` : `bg-gray-900 text-white hover:bg-gray-700 transition hover:border-gray-700`} focus:outline-none border-4 border-gray-900 flex items-center px-8 py-3 rounded-lg font-bold`}>
                                    <CollectionIcon className="w-5 h-5 mr-2"/>
                                    <span>Modules</span>
                                </button>
                            </div>
                            <div className="block mr-2">
                                <button onClick={()=>setActiveTab(3)} className={`${activeTab === 3 ? `bg-white text-gray-900` : `bg-gray-900 text-white hover:bg-gray-700 transition hover:border-gray-700`} focus:outline-none border-4 border-gray-900 flex items-center px-8 py-3 rounded-lg font-bold`}>
                                    <AcademicCapIcon className="w-5 h-5 mr-2"/>
                                    <span>Lessons</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    {/*Forms*/}
                    <div className="mt-10 mb-24">
                        <div className={`${activeTab === 0 ? `` : `hidden`}`}>
                            <h1 className="text-xl text-gray-900 font-bold">User table</h1>
                            <table className="rounded-t-lg mt-3 w-5/6 shadow-lg bg-gray-200 text-gray-800">
                                <tr className="text-left border-b-2 border-gray-300">
                                    <th className="px-4 py-3">#ID</th>
                                    <th className="px-4 py-3">Name</th>
                                    <th className="px-4 py-3">Surname</th>
                                    <th className="px-4 py-3">Email</th>
                                    <th className="px-4 py-3">Login</th>
                                </tr>
                                {usersTableItems}

                            </table>
                            <div className="flex items-start mt-4">
                                <button onClick={()=>{openForm('add')}} className="hover:bg-blue-600 focus:outline-none focus:ring-2 transition font-bold flex items-center mr-3 bg-blue-500 text-white px-8 py-3 rounded-lg">
                                    <PlusCircleIcon className="w-5 h-5 mr-2"/>
                                    <span>Create user</span>
                                </button>
                                <button onClick={()=>{openForm('delete')}} className="hover:bg-red-600 focus:outline-none focus:ring-2 transition font-bold flex items-center mr-3 bg-red-500 text-white px-8 py-3 rounded-lg">
                                    <TrashIcon className="w-5 h-5 mr-2"/>
                                    <span>Delete user</span>
                                </button>
                                <button onClick={()=>{openForm('update')}} className="hover:bg-green-600 focus:outline-none focus:ring-2 transition font-bold flex items-center mr-3 bg-green-500 text-white px-8 py-3 rounded-lg">
                                    <RefreshIcon className="w-5 h-5 mr-2"/>
                                    <span>Update user</span>
                                </button>
                            </div>
                            <div className={`${activeAction === 'add' ? ` ` : ` hidden `} mt-10 add-user-form`}>
                                <form onSubmit={()=>submitUser()}>
                                    <div className="flex items-start">
                                        <div className="mr-2">
                                            <label htmlFor="price"
                                                   className="block font-medium text-gray-700 mb-2">Name</label>
                                            <input type="text" className="focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gray-500 rounded-lg px-6 py-3" placeholder="Enter"/>
                                        </div>
                                        <div className="mr-2">
                                            <label htmlFor="price"
                                                   className="block font-medium text-gray-700 mb-2">Surname</label>
                                            <input type="text" className="focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gray-500 rounded-lg px-6 py-3" placeholder="Enter"/>
                                        </div>
                                        <div className="mr-2">
                                            <label htmlFor="price"
                                                   className="block font-medium text-gray-700 mb-2">Email</label>
                                            <input type="email" className="focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gray-500 rounded-lg px-6 py-3" placeholder="Enter"/>
                                        </div>
                                    </div>
                                    <div className="flex items-start mt-5">
                                        <div className="mr-2">
                                            <label htmlFor="price"
                                                   className="block font-medium text-gray-700 mb-2">Login</label>
                                            <input type="text" className="focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gray-500 rounded-lg px-6 py-3" placeholder="Enter"/>
                                        </div>
                                        <div className="mr-2">
                                            <label htmlFor="price"
                                                   className="block font-medium text-gray-700 mb-2">Password</label>
                                            <input type="password" className="focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gray-500 rounded-lg px-6 py-3" placeholder="Enter"/>
                                        </div>
                                    </div>
                                    <button className="mt-10 hover:bg-blue-600 focus:outline-none focus:ring-2 transition font-bold flex items-center mr-3 bg-blue-500 text-white px-8 py-3 rounded-lg">
                                        Create user
                                    </button>
                                </form>
                            </div>
                            <div className={`${activeAction === 'delete' ? ` ` : ` hidden `} mt-10 add-user-form`}>
                                <form onSubmit={()=>submitUser()}>
                                    <div className="mr-10 text-lg font-bold">
                                        <h1>Enter user id you want delete.</h1>
                                    </div>
                                    <div className="flex items-start mt-4">
                                        <div className="mr-2">
                                            <input type="number" className="focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gray-500 rounded-lg px-6 py-3" placeholder="Enter"/>
                                        </div>
                                        <div className="ml-5">
                                            <button className="hover:bg-red-600 focus:outline-none focus:ring-2 transition font-bold flex items-center mr-3 bg-red-500 text-white px-8 py-3 rounded-lg">
                                                Delete user
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className={`${activeAction === 'update' ? ` ` : ` hidden `} mt-10 add-user-form`}>
                                <form onSubmit={()=>submitUser()}>
                                    <div className="flex items-start">
                                        <div className="mr-2">
                                            <label htmlFor="price"
                                                   className="block font-medium text-gray-700 mb-2">ID</label>
                                            <input type="number" className="focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gray-500 rounded-lg px-6 py-3" placeholder="Enter"/>
                                        </div>
                                        <div className="mr-2">
                                            <label htmlFor="price"
                                                   className="block font-medium text-gray-700 mb-2">Name</label>
                                            <input type="text" className="focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gray-500 rounded-lg px-6 py-3" placeholder="Enter"/>
                                        </div>
                                        <div className="mr-2">
                                            <label htmlFor="price"
                                                   className="block font-medium text-gray-700 mb-2">Surname</label>
                                            <input type="text" className="focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gray-500 rounded-lg px-6 py-3" placeholder="Enter"/>
                                        </div>
                                    </div>
                                    <div className="flex items-start mt-5">
                                        <div className="mr-2">
                                            <label htmlFor="price"
                                                   className="block font-medium text-gray-700 mb-2">Email</label>
                                            <input type="email" className="focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gray-500 rounded-lg px-6 py-3" placeholder="Enter"/>
                                        </div>
                                        <div className="mr-2">
                                            <label htmlFor="price"
                                                   className="block font-medium text-gray-700 mb-2">Login</label>
                                            <input type="text" className="focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gray-500 rounded-lg px-6 py-3" placeholder="Enter"/>
                                        </div>
                                        <div className="mr-2">
                                            <label htmlFor="price"
                                                   className="block font-medium text-gray-700 mb-2">Password</label>
                                            <input type="password" className="focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gray-500 rounded-lg px-6 py-3" placeholder="Enter"/>
                                        </div>
                                    </div>
                                    <button className="mt-10 hover:bg-green-600 focus:outline-none focus:ring-2 transition font-bold flex items-center mr-3 bg-green-500 text-white px-8 py-3 rounded-lg">
                                        Update user
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div className={`${activeTab === 1 ? `` : `hidden`}`}>
                            <h1 className="text-xl text-gray-900 font-bold">Courses table</h1>
                            <table className="rounded-t-lg mt-3 mr-24 shadow-lg bg-gray-200 text-gray-800">
                                <tr className="text-left border-b-2 border-gray-300">
                                    <th className="px-4 py-3">#ID</th>
                                    <th className="px-4 py-3">Lessons</th>
                                    <th className="px-4 py-3">ImageLink</th>
                                    <th className="px-4 py-3">Title</th>
                                    <th className="px-4 py-3">Description</th>
                                    <th className="px-4 py-3">Requirements</th>
                                    <th className="px-4 py-3">Advantages</th>
                                </tr>
                                {coursesTableItems}
                            </table>
                            <div className="flex items-start mt-4">
                                <button onClick={()=>{openForm('add')}} className="hover:bg-blue-600 focus:outline-none focus:ring-2 transition font-bold flex items-center mr-3 bg-blue-500 text-white px-8 py-3 rounded-lg">
                                    <PlusCircleIcon className="w-5 h-5 mr-2"/>
                                    <span>Create course</span>
                                </button>
                                <button onClick={()=>{openForm('delete')}} className="hover:bg-red-600 focus:outline-none focus:ring-2 transition font-bold flex items-center mr-3 bg-red-500 text-white px-8 py-3 rounded-lg">
                                    <TrashIcon className="w-5 h-5 mr-2"/>
                                    <span>Delete course</span>
                                </button>
                                <button onClick={()=>{openForm('update')}} className="hover:bg-green-600 focus:outline-none focus:ring-2 transition font-bold flex items-center mr-3 bg-green-500 text-white px-8 py-3 rounded-lg">
                                    <RefreshIcon className="w-5 h-5 mr-2"/>
                                    <span>Update course</span>
                                </button>
                            </div>
                            <div className={`${activeAction === 'add' ? ` ` : ` hidden `} mt-10 add-user-form`}>
                                <form onSubmit={()=>submitCourse()}>
                                    <div className="flex items-start">
                                        <div className="mr-2">
                                            <label htmlFor="price"
                                                   className="block font-medium text-gray-700 mb-2">Lessons</label>
                                            <input type="text" className="focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gray-500 rounded-lg px-6 py-3" placeholder="Enter"/>
                                        </div>
                                        <div className="mr-2">
                                            <label htmlFor="price"
                                                   className="block font-medium text-gray-700 mb-2">Image link</label>
                                            <input type="url" className="focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gray-500 rounded-lg px-6 py-3" placeholder="Enter"/>
                                        </div>
                                        <div className="mr-2">
                                            <label htmlFor="price"
                                                   className="block font-medium text-gray-700 mb-2">Title</label>
                                            <input type="text" className="focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gray-500 rounded-lg px-6 py-3" placeholder="Enter"/>
                                        </div>
                                    </div>
                                    <div className="flex items-start mt-5">
                                        <div className="mr-2">
                                            <label htmlFor="price"
                                                   className="block font-medium text-gray-700 mb-2">Description</label>
                                            <textarea className="focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gray-500 rounded-lg px-6 py-3" placeholder="Enter"/>
                                        </div>
                                        <div className="mr-2">
                                            <label htmlFor="price"
                                                   className="block font-medium text-gray-700 mb-2">Requirements</label>
                                            <textarea className="focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gray-500 rounded-lg px-6 py-3" placeholder="Enter"/>
                                        </div>
                                        <div className="mr-2">
                                            <label htmlFor="price"
                                                   className="block font-medium text-gray-700 mb-2">Advantages</label>
                                            <textarea className="focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gray-500 rounded-lg px-6 py-3" placeholder="Enter"/>
                                        </div>
                                    </div>
                                    <button className="mt-10 hover:bg-blue-600 focus:outline-none focus:ring-2 transition font-bold flex items-center mr-3 bg-blue-500 text-white px-8 py-3 rounded-lg">
                                        Create course
                                    </button>
                                </form>
                            </div>
                            <div className={`${activeAction === 'delete' ? ` ` : ` hidden `} mt-10 add-user-form`}>
                                <form onSubmit={()=>submitUser()}>
                                    <div className="mr-10 text-lg font-bold">
                                        <h1>Enter course id you want delete.</h1>
                                    </div>
                                    <div className="flex items-start mt-4">
                                        <div className="mr-2">
                                            <input type="number" className="focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gray-500 rounded-lg px-6 py-3" placeholder="Enter"/>
                                        </div>
                                        <div className="ml-5">
                                            <button className="hover:bg-red-600 focus:outline-none focus:ring-2 transition font-bold flex items-center mr-3 bg-red-500 text-white px-8 py-3 rounded-lg">
                                                Delete user
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className={`${activeAction === 'update' ? ` ` : ` hidden `} mt-10 add-user-form`}>
                                <form onSubmit={()=>submitCourse()}>
                                    <div className="flex items-start">
                                        <div className="mr-2">
                                            <label htmlFor="price"
                                                   className="block font-medium text-gray-700 mb-2">ID</label>
                                            <input type="number" className="focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gray-500 rounded-lg px-6 py-3" placeholder="Enter"/>
                                        </div>
                                        <div className="mr-2">
                                            <label htmlFor="price"
                                                   className="block font-medium text-gray-700 mb-2">Lessons</label>
                                            <input type="text" className="focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gray-500 rounded-lg px-6 py-3" placeholder="Enter"/>
                                        </div>
                                        <div className="mr-2">
                                            <label htmlFor="price"
                                                   className="block font-medium text-gray-700 mb-2">Image link</label>
                                            <input type="url" className="focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gray-500 rounded-lg px-6 py-3" placeholder="Enter"/>
                                        </div>
                                        <div className="mr-2">
                                            <label htmlFor="price"
                                                   className="block font-medium text-gray-700 mb-2">Title</label>
                                            <input type="text" className="focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gray-500 rounded-lg px-6 py-3" placeholder="Enter"/>
                                        </div>
                                    </div>
                                    <div className="flex items-start mt-5">
                                        <div className="mr-2">
                                            <label htmlFor="price"
                                                   className="block font-medium text-gray-700 mb-2">Description</label>
                                            <textarea className="focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gray-500 rounded-lg px-6 py-3" placeholder="Enter"/>
                                        </div>
                                        <div className="mr-2">
                                            <label htmlFor="price"
                                                   className="block font-medium text-gray-700 mb-2">Requirements</label>
                                            <textarea className="focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gray-500 rounded-lg px-6 py-3" placeholder="Enter"/>
                                        </div>
                                        <div className="mr-2">
                                            <label htmlFor="price"
                                                   className="block font-medium text-gray-700 mb-2">Advantages</label>
                                            <textarea className="focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gray-500 rounded-lg px-6 py-3" placeholder="Enter"/>
                                        </div>
                                    </div>
                                    <button className="mt-10 hover:bg-green-600 focus:outline-none focus:ring-2 transition font-bold flex items-center mr-3 bg-green-500 text-white px-8 py-3 rounded-lg">
                                        Update course
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div className={`${activeTab === 2 ? `` : `hidden`}`}>
                            <h1 className="text-xl text-gray-900 font-bold">Modules table</h1>
                            <table className="rounded-t-lg mt-3 w-5/6 shadow-lg bg-gray-200 text-gray-800">
                                <tr className="text-left border-b-2 border-gray-300">
                                    <th className="px-4 py-3">#ID</th>
                                    <th className="px-4 py-3">Title</th>
                                    <th className="px-4 py-3">Course ID</th>
                                    <th className="px-4 py-3">Number of lessons</th>
                                </tr>
                                {modulesTableItems}
                            </table>
                            <div className="flex items-start mt-4">
                                <button onClick={()=>{openForm('add')}} className="hover:bg-blue-600 focus:outline-none focus:ring-2 transition font-bold flex items-center mr-3 bg-blue-500 text-white px-8 py-3 rounded-lg">
                                    <PlusCircleIcon className="w-5 h-5 mr-2"/>
                                    <span>Create module</span>
                                </button>
                                <button onClick={()=>{openForm('delete')}} className="hover:bg-red-600 focus:outline-none focus:ring-2 transition font-bold flex items-center mr-3 bg-red-500 text-white px-8 py-3 rounded-lg">
                                    <TrashIcon className="w-5 h-5 mr-2"/>
                                    <span>Delete module</span>
                                </button>
                                <button onClick={()=>{openForm('update')}} className="hover:bg-green-600 focus:outline-none focus:ring-2 transition font-bold flex items-center mr-3 bg-green-500 text-white px-8 py-3 rounded-lg">
                                    <RefreshIcon className="w-5 h-5 mr-2"/>
                                    <span>Update module</span>
                                </button>
                            </div>
                            <div className={`${activeAction === 'add' ? ` ` : ` hidden `} mt-10 add-user-form`}>
                                <form onSubmit={()=>submitCourse()}>
                                    <div className="flex items-start">
                                        <div className="mr-2">
                                            <label htmlFor="price"
                                                   className="block font-medium text-gray-700 mb-2">Title</label>
                                            <input type="text" className="focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gray-500 rounded-lg px-6 py-3" placeholder="Enter"/>
                                        </div>
                                        <div className="mr-2">
                                            <label htmlFor="price"
                                                   className="block font-medium text-gray-700 mb-2">Course ID</label>
                                            <input type="number" className="focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gray-500 rounded-lg px-6 py-3" placeholder="Enter"/>
                                        </div>
                                        <div className="mr-2">
                                            <label htmlFor="price"
                                                   className="block font-medium text-gray-700 mb-2">Number of lessons</label>
                                            <input type="number" className="focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gray-500 rounded-lg px-6 py-3" placeholder="Enter"/>
                                        </div>
                                    </div>
                                    <button className="mt-10 hover:bg-blue-600 focus:outline-none focus:ring-2 transition font-bold flex items-center mr-3 bg-blue-500 text-white px-8 py-3 rounded-lg">
                                        Create module
                                    </button>
                                </form>
                            </div>
                            <div className={`${activeAction === 'delete' ? ` ` : ` hidden `} mt-10 add-user-form`}>
                                <form onSubmit={()=>submitUser()}>
                                    <div className="mr-10 text-lg font-bold">
                                        <h1>Enter module id you want delete.</h1>
                                    </div>
                                    <div className="flex items-start mt-4">
                                        <div className="mr-2">
                                            <input type="number" className="focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gray-500 rounded-lg px-6 py-3" placeholder="Enter"/>
                                        </div>
                                        <div className="ml-5">
                                            <button className="hover:bg-red-600 focus:outline-none focus:ring-2 transition font-bold flex items-center mr-3 bg-red-500 text-white px-8 py-3 rounded-lg">
                                                Delete module
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className={`${activeAction === 'update' ? ` ` : ` hidden `} mt-10 add-user-form`}>
                                <form onSubmit={()=>submitCourse()}>
                                    <div className="flex items-start">
                                        <div className="mr-2">
                                            <label htmlFor="price"
                                                   className="block font-medium text-gray-700 mb-2">ID</label>
                                            <input type="number" className="focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gray-500 rounded-lg px-6 py-3" placeholder="Enter"/>
                                        </div>
                                        <div className="mr-2">
                                            <label htmlFor="price"
                                                   className="block font-medium text-gray-700 mb-2">Title</label>
                                            <input type="text" className="focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gray-500 rounded-lg px-6 py-3" placeholder="Enter"/>
                                        </div>
                                        <div className="mr-2">
                                            <label htmlFor="price"
                                                   className="block font-medium text-gray-700 mb-2">Course ID</label>
                                            <input type="number" className="focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gray-500 rounded-lg px-6 py-3" placeholder="Enter"/>
                                        </div>
                                        <div className="mr-2">
                                            <label htmlFor="price"
                                                   className="block font-medium text-gray-700 mb-2">Number of lessons</label>
                                            <input type="number" className="focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gray-500 rounded-lg px-6 py-3" placeholder="Enter"/>
                                        </div>
                                    </div>
                                    <button className="mt-10 hover:bg-green-600 focus:outline-none focus:ring-2 transition font-bold flex items-center mr-3 bg-green-500 text-white px-8 py-3 rounded-lg">
                                        Update module
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div className={`${activeTab === 3 ? `` : `hidden`}`}>
                            <h1 className="text-xl text-gray-900 font-bold">Lessons table</h1>
                            <table className="rounded-t-lg mt-3 mr-10 shadow-lg bg-gray-200 text-gray-800">
                                <tr className="text-left border-b-2 border-gray-300">
                                    <th className="px-4 py-3">#ID</th>
                                    <th className="px-4 py-3">Type</th>
                                    <th className="px-4 py-3">Module ID</th>
                                    <th className="px-4 py-3">Title</th>
                                    <th className="px-4 py-3">Link</th>
                                    <th className="px-4 py-3">Content</th>
                                </tr>
                                {lessonsTableItems}
                            </table>
                            <div className="flex items-start mt-4">
                                <button onClick={()=>{openForm('add')}} className="hover:bg-blue-600 focus:outline-none focus:ring-2 transition font-bold flex items-center mr-3 bg-blue-500 text-white px-8 py-3 rounded-lg">
                                    <PlusCircleIcon className="w-5 h-5 mr-2"/>
                                    <span>Create lesson</span>
                                </button>
                                <button onClick={()=>{openForm('delete')}} className="hover:bg-red-600 focus:outline-none focus:ring-2 transition font-bold flex items-center mr-3 bg-red-500 text-white px-8 py-3 rounded-lg">
                                    <TrashIcon className="w-5 h-5 mr-2"/>
                                    <span>Delete lesson</span>
                                </button>
                                <button onClick={()=>{openForm('update')}} className="hover:bg-green-600 focus:outline-none focus:ring-2 transition font-bold flex items-center mr-3 bg-green-500 text-white px-8 py-3 rounded-lg">
                                    <RefreshIcon className="w-5 h-5 mr-2"/>
                                    <span>Update lesson</span>
                                </button>
                            </div>
                            <div className={`${activeAction === 'add' ? ` ` : ` hidden `} mt-10 add-user-form`}>
                                <form onSubmit={()=>submitCourse()}>
                                    <div className="flex items-start">
                                        <div className="mr-2">
                                            <label htmlFor="price"
                                                   className="block font-medium text-gray-700 mb-2">Type</label>
                                            <input type="text" className="focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gray-500 rounded-lg px-6 py-3" placeholder="Enter"/>
                                        </div>
                                        <div className="mr-2">
                                            <label htmlFor="price"
                                                   className="block font-medium text-gray-700 mb-2">Module ID</label>
                                            <input type="number" className="focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gray-500 rounded-lg px-6 py-3" placeholder="Enter"/>
                                        </div>
                                        <div className="mr-2">
                                            <label htmlFor="price"
                                                   className="block font-medium text-gray-700 mb-2">Title</label>
                                            <input type="text" className="focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gray-500 rounded-lg px-6 py-3" placeholder="Enter"/>
                                        </div>
                                    </div>
                                    <div className="flex items-start mt-5">
                                        <div className="mr-2">
                                            <label htmlFor="price"
                                                   className="block font-medium text-gray-700 mb-2">Link</label>
                                            <input type="url" className="focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gray-500 rounded-lg px-6 py-3" placeholder="Enter"/>
                                        </div>
                                        <div className="mr-2">
                                            <label htmlFor="price"
                                                   className="block font-medium text-gray-700 mb-2">Content</label>
                                            <textarea className="focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gray-500 rounded-lg px-6 py-3" placeholder="Enter"/>
                                        </div>
                                    </div>
                                    <button className="mt-10 hover:bg-blue-600 focus:outline-none focus:ring-2 transition font-bold flex items-center mr-3 bg-blue-500 text-white px-8 py-3 rounded-lg">
                                        Create lesson
                                    </button>
                                </form>
                            </div>
                            <div className={`${activeAction === 'delete' ? ` ` : ` hidden `} mt-10 add-user-form`}>
                                <form onSubmit={()=>submitUser()}>
                                    <div className="mr-10 text-lg font-bold">
                                        <h1>Enter lesson id you want delete.</h1>
                                    </div>
                                    <div className="flex items-start mt-4">
                                        <div className="mr-2">
                                            <input type="number" className="focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gray-500 rounded-lg px-6 py-3" placeholder="Enter"/>
                                        </div>
                                        <div className="ml-5">
                                            <button className="hover:bg-red-600 focus:outline-none focus:ring-2 transition font-bold flex items-center mr-3 bg-red-500 text-white px-8 py-3 rounded-lg">
                                                Delete lesson
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className={`${activeAction === 'update' ? ` ` : ` hidden `} mt-10 add-user-form`}>
                                <form onSubmit={()=>submitCourse()}>
                                    <div className="flex items-start">
                                        <div className="mr-2">
                                            <label htmlFor="price"
                                                   className="block font-medium text-gray-700 mb-2">ID</label>
                                            <input type="number" className="focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gray-500 rounded-lg px-6 py-3" placeholder="Enter"/>
                                        </div>
                                        <div className="mr-2">
                                            <label htmlFor="price"
                                                   className="block font-medium text-gray-700 mb-2">Type</label>
                                            <input type="text" className="focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gray-500 rounded-lg px-6 py-3" placeholder="Enter"/>
                                        </div>
                                        <div className="mr-2">
                                            <label htmlFor="price"
                                                   className="block font-medium text-gray-700 mb-2">Module ID</label>
                                            <input type="number" className="focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gray-500 rounded-lg px-6 py-3" placeholder="Enter"/>
                                        </div>
                                    </div>
                                    <div className="flex items-start mt-5">
                                        <div className="mr-2">
                                            <label htmlFor="price"
                                                   className="block font-medium text-gray-700 mb-2">Title</label>
                                            <input type="text" className="focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gray-500 rounded-lg px-6 py-3" placeholder="Enter"/>
                                        </div>
                                        <div className="mr-2">
                                            <label htmlFor="price"
                                                   className="block font-medium text-gray-700 mb-2">Link</label>
                                            <input type="url" className="focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gray-500 rounded-lg px-6 py-3" placeholder="Enter"/>
                                        </div>
                                        <div className="mr-2">
                                            <label htmlFor="price"
                                                   className="block font-medium text-gray-700 mb-2">Content</label>
                                            <textarea className="focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gray-500 rounded-lg px-6 py-3" placeholder="Enter"/>
                                        </div>
                                    </div>
                                    <button className="mt-10 hover:bg-green-600 focus:outline-none focus:ring-2 transition font-bold flex items-center mr-3 bg-green-500 text-white px-8 py-3 rounded-lg">
                                        Update lesson
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            {/*Sidebar*/}
            <div className={`${show ? '-translate-x-full': ``} fixed inset-y-0 left-0 p-4 w-64 h-full bg-gray-800 transform transition-200 ease-in-out`}>
                <Link to="/">
                    <h1 className="text-white font-bold text-center text-xl mt-10 mb-10 cursor-pointer">ONLINE COURSES</h1>
                </Link>

                <Link to="/">
                    <div className="mt-2 hover:bg-blue-500 transition font-bold cursor-pointer bg-gray-900 text-gray-100 flex items-center px-5 py-3 rounded-lg">
                        <HomeIcon className="w-5 h-5 mr-2"/>
                        <span>Home</span>
                    </div>
                </Link>

                <Link to="/contacts">
                    <div className="mt-2 hover:bg-blue-500 transition font-bold cursor-pointer bg-gray-900 text-gray-100 flex items-center px-5 py-3 rounded-lg">
                        <TiContacts className="w-5 h-5 mr-2"/>
                        <span>Contacts</span>
                    </div>
                </Link>

                <div onClick={()=>{setTab('tables')}} className="mt-2 hover:bg-blue-500 transition font-bold cursor-pointer bg-gray-900 text-gray-100 flex items-center px-5 py-3 rounded-lg">
                    <TableIcon className="w-5 h-5 mr-2"/>
                    <span>Tables</span>
                </div>

                <div onClick={()=>{setTab('stats')}} className="mt-2 hover:bg-blue-500 transition font-bold cursor-pointer bg-gray-900 text-gray-100 flex items-center px-5 py-3 rounded-lg">
                    <ChartSquareBarIcon className="w-5 h-5 mr-2"/>
                    <span>Statistics</span>
                </div>


            </div>

        </>
    )
}

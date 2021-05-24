import React from 'react'
import axios from "axios";

export default class AdminApi {
    constructor() {
        this._apiBase = 'http://localhost:8000/api/admin'
    }

    // Users

    createUser = async (user) => {
        let data
        await axios.post(`${this._apiBase}/create_user`, user)
            .then(res => {data = res})
        return data
    }

    deleteUser = async (user) => {
        let data
        await axios.post(`${this._apiBase}/delete_user`, user)
            .then(res => {data = res})
        return data
    }

    updateUser = async (user) => {
        let data
        await axios.post(`${this._apiBase}/update_user`, user)
            .then(res => {data = res})
        return data
    }

    // Courses

    createCourse = async (course) => {
        let data
        await axios.post(`${this._apiBase}/create_course`, course)
            .then(res => {data = res})
        return data
    }

    deleteCourse = async (course) => {
        let data
        await axios.post(`${this._apiBase}/delete_course`, course)
            .then(res => {data = res})
        return data
    }

    updateCourse = async (course) => {
        let data
        await axios.post(`${this._apiBase}/update_course`, course)
            .then(res => {data = res})
        return data
    }

    // Modules

    createModule = async (module) => {
        let data
        await axios.post(`${this._apiBase}/create_module`, module)
            .then(res => {data = res})
        return data
    }

    deleteModule = async (module) => {
        let data
        await axios.post(`${this._apiBase}/delete_module`, module)
            .then(res => {data = res})
        return data
    }

    updateModule = async (module) => {
        let data
        await axios.post(`${this._apiBase}/update_module`, module)
            .then(res => {data = res})
        return data
    }

}
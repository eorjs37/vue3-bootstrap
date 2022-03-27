import useAxios from '/@app_modules/axios.js';
const { axiosPost, axiosPut } = useAxios();

export default function(){
    const checkToken = (email, token) =>
        new Promise((resolve, reject) => {
            axiosPost(
                `/db/accounts/check-token/${email}/${token}`,
                {},
                (data) => {
                    resolve(data)
                },
                (data) => {
                    reject(data)
                }
            )
        })

    const updatePassword = (email, password, oldpassword) =>
        new Promise((resolve, reject) => {
            axiosPut(
                `/db/accounts/${email}/${password}/${oldpassword}`,
                {},
                (data) => {
                    resolve(data);
                },
                (err) => {
                    reject(err);
                }
            )
        });

    const login = (email, password) =>
        new Promise((resolve, reject) => {
            axiosPost(
                `/db/accounts/login/${email}/${password}`,
                {},
                (data) => {
                    resolve(data)
                },
                (err) => {
                    reject(err)
                }
            )
        });
    

    return {
        checkToken,
        updatePassword,
        login
    }
}
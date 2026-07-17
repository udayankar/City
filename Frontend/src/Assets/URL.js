export const Logo_URL = "https://tse3.mm.bing.net/th/id/OIP.QUM-ZOG4QTjh8yGPt9ZrkgHaHa?pid=Api&P=0&h=180";

export const Map_URL = {
    Rohtak : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d80200.16874199077!2d76.53393176555377!3d28.88966129341876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d85a5414251a5%3A0x9f011cc2777a4544!2sRohtak%2C%20Haryana!5e1!3m2!1sen!2sin!4v1783192595486!5m2!1sen!2sin",
    Gohana : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d20001.704309735433!2d76.67541117827163!3d29.13901155970308!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390decd90e07f1d5%3A0xe86589ac490395a2!2sGohana%2C%20Haryana%20131301!5e1!3m2!1sen!2sin!4v1783192249717!5m2!1sen!2sin",
    Panipat : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d79805.57640129578!2d76.88171774182264!3d29.396485428312783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390dda457afbe651%3A0x41d3f6feacaa74d4!2sPanipat%2C%20Haryana!5e1!3m2!1sen!2sin!4v1783192632123!5m2!1sen!2sin",
};

const API_KEY = process.env.OPENWEATHER_API_KEY;

export const Weather_URL = ["https://api.openweathermap.org/data/2.5/weather?q=" , `&units=metric&appid=${API_KEY}`];


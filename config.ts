const siteMetadata = {
    title: `Camaule`,
    siteUrl: `http://localhost`,
    capitalizeTitleOnHome: false,
    logo: `/images/logo.png`,
    icon: `/images/icon.png`,
    titleImage: `/images/wall.png`,
    logoImage: `/images/logo2.png`,
    ogImage: `/images/wall.png`,
    twoColumnWall: true,
    cookiePolicy: true,
    introTag: `Fundación Comunidad Artística del Maule`,
    description: `Fundada el año 2018`,
    about:
        "Aquí su potente lema que sea como la bandera de lucha, quiza mas poetica, que tiene la fundacioms, que opinan?",
    author: `juliopo`,
    blogItemsPerPage: 10,
    portfolioItemsPerPage: 10,
    darkmode: true,
    switchTheme: true,
    navLinks: [
        {
            name: "Inicio",
            url: "/",
        },
        {
            name: "Bio",
            url: "/bio",
        },
        {
            name: "Blog",
            url: "/blog",
        },
        {
            name: "Actividades",
            url: "/portfolio",
        },
        {
            name: "Contáctanos",
            url: "/contact",
        },
    ],
    footerLinks: [
        {
            name: "Política de privacidad",
            url: "/politica-privacidad",
        },
        {
            name: "Código original",
            url: "https://github.com/akzhy/gatsby-starter-elemental",
        },
    ],
    social: [
        {
            name: "Facebook",
            icon: "/images/Facebook.svg",
            url: "#",
        },
        {
            name: "Twitter",
            icon: "/images/Twitter.svg",
            url: "#",
        },
        {
            name: "Instagram",
            icon: "/images/Instagram.svg",
            url: "#",
        },
        {
            name: "Youtube",
            icon: "/images/Youtube.svg",
            url: "#",
        },
    ],
    contact: {
        // leave empty ('') or false to hide form
        api_url: "https://getform.io/f/a7f572ed-927e-4388-8037-143bbd007849",
        description: `Puedes escribirnos para obtner información detallada, responderemos a la brevedad.`,
        mail: "contacto@camaule.ml",
        phone: "+56 9 222 22222",
        address: "2020 \nTalca \nRegión del Maule, Chile",
    },
    disqus: "elemental-netlify-com",
}

const beforeContactFormSubmit = data => {
    // Code 0 - success
    // Code 1 - Name
    // Code 2 - Email
    // Code 3 - Message
    // Code 4 - Other
    const errors = []

    if (data.name.trim().length < 2) {
        errors.push({
            code: 1,
            message: "Ingresa un nombre",
        })
    }

    if (!data.email.match(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/)) {
        errors.push({
            code: 2,
            message: "Ingresa una cuenta de correo válida",
        })
    }

    if (data.message.trim().length < 15) {
        errors.push({
            code: 3,
            message: "Ingresa un mensaje con mínimo 15 caracteres",
        })
    }

    if (errors.length > 0)
        return {
            result: false,
            errors: errors,
        }

    return {
        data: {
            name: data.name,
            email: data.email,
            message: data.message,
        },
        result: true,
    }
}

const contactFormSubmit = async (api, data) => {
    let res: any = await fetch(api, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })

    res = await res.json()

    if (res.success) {
        return {
            result: true,
        }
    }
    return {
        result: false,
        ...res,
    }
}

const defaults = {
    disqus: null,
    twoColumnWall: true,
    darkmode: false,
    switchTheme: true,
    capitalizeTitleOnHome: true,
    cookiePolicy: false
}

Object.keys(defaults).forEach(item => {
    if (siteMetadata[item] === undefined) {
        siteMetadata[item] = defaults[item]
    }
})

export { siteMetadata, beforeContactFormSubmit, contactFormSubmit }

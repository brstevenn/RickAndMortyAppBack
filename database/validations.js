function validationCharacters(name, status, species, gender, image) {

	if(!Number(name) || !Number(status) || !Number(species) || !Number(gender) || !Number(image)){


		if(!Number(name) && name.length > 0){
			name = name.toLowerCase()
			name = name[0].toUpperCase() + name.substring(1)
			if(name.includes("%20") || name.includes(" ")){
				name = name.replace("%20", " ").split(" ").map(n => n[0].toUpperCase() + n.substring(1)).toString().replaceAll(",", " ")	
			}
		} else if(Number(name) || name.length <= 0){
			name = "Another"
		}

		if(!Number(status) && status.length > 0){
			status = status.toLowerCase()
			if(status === "alive" || status === "dead" || status === "unknown"){
				status = status[0].toUpperCase() + status.substring(1)
			} else {
				status = "Alive"
			}
		} else if(Number(status) || status.length <= 0){
			status = "Alive"
		}

		if(species.length > 0 && !Number(species)){
			species = species.toLowerCase()
			species = species[0].toUpperCase() + species.substring(1)
		} else if(Number(species) || species.length <= 0){
			species = "Unknown"
		}

		if(!Number(gender) && gender.length > 0){
			gender = gender.toLowerCase()
			gender = gender[0].toUpperCase() + gender.substring(1)
		} else if(Number(gender) || gender.length <= 0){
			gender = "Unknown"
		}

		if(!Number(image) && image.length > 0){
			image = image.toLowerCase()
			if(image.includes(".png") || image.includes(".jpg")){
				image = image
			}
			else {
				image = "Not available"
			}
		}  else if(Number(image) || image.length <= 0){
			image = "https://www.google.com/search?q=Unknow&tbm=isch&ved=2ahUKEwiHjNa-ps_6AhUJBt8KHTPfAOEQ2-cCegQIABAA&oq=Unknow&gs_lcp=CgNpbWcQAzIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQ6BAgjECc6CggAELEDEIMBEEM6BwgAELEDEEM6BAgAEEM6CAgAEIAEELEDUIqfAVjaqwFg4q0BaAFwAHgAgAHsAogB2wqSAQcwLjMuMS4ymAEAoAEBqgELZ3dzLXdpei1pbWfAAQE&sclient=img&ei=HLpAY4eOH4mM_AazvoOIDg&bih=652&biw=1024&client=firefox-b-lm"
		}

		return {name, status, species, gender, image}

	} else {
		return {name: "Universo", status: "Alive", species: "Universo", gender: "Universo", image: "https://www.google.com/search?q=universo&tbm=isch&ved=2ahUKEwjgp9y6ps_6AhWILN8KHfD5BuIQ2-cCegQIABAA&oq=universo&gs_lcp=CgNpbWcQAzIECCMQJzIICAAQgAQQsQMyCAgAEIAEELEDMggIABCABBCxAzIICAAQgAQQsQMyCAgAEIAEELEDMgsIABCABBCxAxCDATIICAAQgAQQsQMyCAgAEIAEELEDMgUIABCABFDTAVjoBmCcDmgAcAB4AIAB0geIAdIHkgEDNi0xmAEAoAEBqgELZ3dzLXdpei1pbWfAAQE&sclient=img&ei=FLpAY-DNDYjZ_Abw85uQDg&bih=652&biw=1024&client=firefox-b-lm"}
	}
}

function validateEpisodes(name, air_date, episode) {

	if(Number(name) || name.length <= 0){
		name = "The 9999"
	}

	if(!Number(name)){
		name = name.toLowerCase()
		name = name[0].toUpperCase() + name.substring(1)
		if(name.includes("%20") || name.includes(" ")){
			name = name.replace("%20", " ").split(" ").map(n => n[0].toUpperCase() + n.substring(1)).toString().replaceAll(",", " ")
		} if(name.length < 1) {
			name = "Default"
		} else {
			name = name
		}
	}

	if(!Number(air_date)){
		air_date = air_date.replace(",", "")
		air_date = air_date.split(" ")

		let mes = air_date[0]
			day = air_date[1]
			year = air_date[2]

		mes = mes.toLowerCase()

		switch(mes){
			case "january":
				mes = "January"
				break;
			case "february":
				mes = "February"
				break;
			case "march":
				mes = "March"
				break;
			case "april":
				mes = "April"
				break;
			case "may":
				mes = "May"
				break;
			case "june":
				mes = "June"
				break;
			case "july":
				mes = "July"
				break;
			case "august":
				mes = "Agus"
				break;
			case "september":
				mes = "September"
				break;
			case "octover":
				mes = "Octover"
				break;
			case "november":
				mes = "November"
				break;
			case "december":
				mes = "December"
				break;
			default:
				mes = "December"
				break;
		}

		if(Number(day) || Number(year)){
			if(Number(day) && day <= 31){day = day}else{day = 31}
			if(Number(year)){year = year}else {year = 9999}
		} else {
			day = 31
			year = 9999
		}

		air_date = mes + " " + day + ", " + year
	}

	if(!Number(episode)){
		episode = episode.toUpperCase()
		let se = episode.slice(0, episode.length / 2),
			ep = episode.slice(episode.length / 2)
		if(episode[0] === "S" && episode[3] === "E"){
			se = se.split("S").toString().replace(",","")
			ep = ep.split("E").toString().replace(",","")
			if(Number(se)){ se = se } else {se = 99}
			if(Number(ep)){ ep = ep } else {ep = 99}
			episode = "S" + se + "E" + ep
		} else {
			episode = "S99E99"
		}
	}

	return {name, air_date, episode}
}

module.exports = {
	validationCharacters,
	validateEpisodes
}
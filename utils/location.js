//oooooooooooooo Récupération des adresses de l'API selon saisie ooooooooooooooooooooo

  const handleSearchTerm = (text) => {
    if (text.length > 2) {
      fetch(`https://api-adresse.data.gouv.fr/search/?q=${text}`)
        .then((response) => response.json())
        .then((json) => {
          setResults(json.features);
        })
        .catch((error) => console.error(error));
    } else {
      setResults([]);
    }
  };

//ooooooooooooo Stockage de l'adresse sélectionnée dans menu contextuel oooooooooooooo

  const handleCitySelected = (city) => {
    setSearchTerm(city.properties.label);
    setResults([]);

    setLocation({
      route:city.properties.name,
      postalCode:city.properties.postcode,
      city:city.properties.city,
      longitude:city.geometry.coordinates[0],
      latitude:city.geometry.coordinates[1]
    })
  };

//oooooooooooooooooo Affichage des données saisies dans l'input ooooooooooooooooooo

  const getCityName = (value) => {
    setSearchTerm(value);
    handleSearchTerm(value);
  };
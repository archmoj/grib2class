"use strict";

var nf0 = require("./nf0");
var println = require("./logger").println;

function seek (key, io) {
    var last = io.length - 1;
    for (var i = 0; i < last; i++) {
        if (key === io[i][0]) return io[i][1];
    }
    return io[last][1]; // i.e defualt
}

function echo (key, io) {
    return println(
        seek(key, io)
    );
}

exports.DisciplineOfProcessedData = function (obj) {
    var key = obj.DisciplineOfProcessedData;
    obj.meta.DisciplineOfProcessedData = echo(key, [
        [0, "Meteorological products"],
        [1, "Hydrological products"],
        [2, "Land surface products"],
        [3, "Space products"],
        [4, "Space Weather Products "],
        [10, "Oceanographic products"],
        [255, "Missing"],
        [null, key]
    ]);
};

exports.IdentificationOfCentre = function (obj) {
    var key = obj.IdentificationOfCentre;
    obj.meta.IdentificationOfCentre = echo(key, [
        [0, "WMO Secretariat"],
        [1, "Melbourne"],
        [2, "Melbourne"],
        [4, "Moscow"],
        [5, "Moscow"],
        [7, "US National Weather Service - National Centres for Environmental Prediction (NCEP)"],
        [8, "US National Weather Service Telecommunications Gateway (NWSTG)"],
        [9, "US National Weather Service - Other"],
        [10, "Cairo (RSMC)"],
        [12, "Dakar (RSMC)"],
        [14, "Nairobi (RSMC)"],
        [16, "Casablanca (RSMC)"],
        [17, "Tunis (RSMC)"],
        [18, "Tunis - Casablanca (RSMC)"],
        [20, "Las Palmas"],
        [21, "Algiers (RSMC)"],
        [22, "ACMAD"],
        [23, "Mozambique (NMC)"],
        [24, "Pretoria (RSMC)"],
        [25, "La Réunion (RSMC)"],
        [26, "Khabarovsk (RSMC)"],
        [28, "New Delhi (RSMC)"],
        [30, "Novosibirsk (RSMC)"],
        [32, "Tashkent (RSMC)"],
        [33, "Jeddah (RSMC)"],
        [34, "Tokyo (RSMC), Japan Meteorological Agency"],
        [36, "Bangkok"],
        [37, "Ulaanbaatar"],
        [38, "Beijing (RSMC)"],
        [40, "Seoul"],
        [41, "Buenos Aires (RSMC)"],
        [43, "Brasilia (RSMC)"],
        [45, "Santiago"],
        [46, "Brazilian Space Agency ­ INPE"],
        [47, "Colombia (NMC)"],
        [48, "Ecuador (NMC)"],
        [49, "Peru (NMC)"],
        [50, "Venezuela (Bolivarian Republic of) (NMC)"],
        [51, "Miami (RSMC)"],
        [52, "Miami (RSMC), National Hurricane Centre"],
        [53, "Montreal (RSMC)"],
        [54, "Montreal (RSMC)"],
        [55, "San Francisco"],
        [56, "ARINC Centre"],
        [57, "US Air Force - Air Force Global Weather Central"],
        [58, "Fleet Numerical Meteorology and Oceanography Center, Monterey, CA, United States"],
        [59, "The NOAA Forecast Systems Laboratory, Boulder, CO, United States"],
        [60, "United States National Center for Atmospheric Research (NCAR)"],
        [61, "Service ARGOS - Landover"],
        [62, "US Naval Oceanographic Office"],
        [63, "International Research Institute for Climate and Society (IRI)"],
        [64, "Honolulu (RSMC)"],
        [65, "Darwin (RSMC)"],
        [67, "Melbourne (RSMC)"],
        [69, "Wellington (RSMC)"],
        [71, "Nadi (RSMC)"],
        [72, "Singapore"],
        [73, "Malaysia (NMC)"],
        [74, "UK Meteorological Office ­ Exeter (RSMC)"],
        [76, "Moscow (RSMC)"],
        [78, "Offenbach (RSMC)"],
        [80, "Rome (RSMC)"],
        [82, "Norrköping"],
        [84, "Toulouse (RSMC)"],
        [85, "Toulouse (RSMC)"],
        [86, "Helsinki"],
        [87, "Belgrade"],
        [88, "Oslo"],
        [89, "Prague"],
        [90, "Episkopi"],
        [91, "Ankara"],
        [92, "Frankfurt/Main"],
        [93, "London (WAFC)"],
        [94, "Copenhagen"],
        [95, "Rota"],
        [96, "Athens"],
        [97, "European Space Agency (ESA)"],
        [98, "European Centre for Medium-Range Weather Forecasts (ECMWF) (RSMC)"],
        [99, "De Bilt"],
        [100, "Brazzaville"],
        [101, "Abidjan"],
        [102, "Libya (NMC)"],
        [103, "Madagascar (NMC)"],
        [104, "Mauritius (NMC)"],
        [105, "Niger (NMC)"],
        [106, "Seychelles (NMC)"],
        [107, "Uganda (NMC)"],
        [108, "United Republic of Tanzania (NMC)"],
        [109, "Zimbabwe (NMC)"],
        [110, "Hong-Kong, China"],
        [111, "Afghanistan (NMC)"],
        [112, "Bahrain (NMC)"],
        [113, "Bangladesh (NMC)"],
        [114, "Bhutan (NMC)"],
        [115, "Cambodia (NMC)"],
        [116, "Democratic People's Republic of Korea (NMC)"],
        [117, "Islamic Republic of Iran (NMC)"],
        [118, "Iraq (NMC)"],
        [119, "Kazakhstan (NMC)"],
        [120, "Kuwait (NMC)"],
        [121, "Kyrgyzstan (NMC)"],
        [122, "Lao People's Democratic Republic (NMC)"],
        [123, "Macao, China"],
        [124, "Maldives (NMC)"],
        [125, "Myanmar (NMC)"],
        [126, "Nepal (NMC)"],
        [127, "Oman (NMC)"],
        [128, "Pakistan (NMC)"],
        [129, "Qatar (NMC)"],
        [130, "Yemen (NMC)"],
        [131, "Sri Lanka (NMC)"],
        [132, "Tajikistan (NMC)"],
        [133, "Turkmenistan (NMC)"],
        [134, "United Arab Emirates (NMC)"],
        [135, "Uzbekistan (NMC)"],
        [136, "Viet Nam (NMC)"],
        [140, "Bolivia (Plurinational State of) (NMC)"],
        [141, "Guyana (NMC)"],
        [142, "Paraguay (NMC)"],
        [143, "Suriname (NMC)"],
        [144, "Uruguay (NMC)"],
        [145, "French Guiana"],
        [146, "Brazilian Navy Hydrographic Centre"],
        [147, "National Commission on Space Activities (CONAE) - Argentina"],
        [150, "Antigua and Barbuda (NMC)"],
        [151, "Bahamas (NMC)"],
        [152, "Barbados (NMC)"],
        [153, "Belize (NMC)"],
        [154, "British Caribbean Territories Centre"],
        [155, "San José"],
        [156, "Cuba (NMC)"],
        [157, "Dominica (NMC)"],
        [158, "Dominican Republic (NMC)"],
        [159, "El Salvador (NMC)"],
        [160, "US NOAA/NESDIS"],
        [161, "US NOAA Office of Oceanic and Atmospheric Research"],
        [162, "Guatemala (NMC)"],
        [163, "Haiti (NMC)"],
        [164, "Honduras (NMC)"],
        [165, "Jamaica (NMC)"],
        [166, "Mexico City"],
        [167, "Curaçao and Sint Maarten (NMC)"],
        [168, "Nicaragua (NMC)"],
        [169, "Panama (NMC)"],
        [170, "Saint Lucia (NMC)"],
        [171, "Trinidad and Tobago (NMC)"],
        [172, "French Departments in RA IV"],
        [173, "US National Aeronautics and Space Administration (NASA)"],
        [174, "Integrated Science Data Management/Marine Environmental Data Service (ISDM/MEDS) - Canada"],
        [175, "University Corporation for Atmospheric Research (UCAR) - United States"],
        [176, "Cooperative Institute for Meteorological Satellite Studies (CIMSS) - United States"],
        [177, "NOAA National Ocean Service - United States"],
        [190, "Cook Islands (NMC)"],
        [191, "French Polynesia (NMC)"],
        [192, "Tonga (NMC)"],
        [193, "Vanuatu (NMC)"],
        [194, "Brunei Darussalam (NMC)"],
        [195, "Indonesia (NMC)"],
        [196, "Kiribati (NMC)"],
        [197, "Federated States of Micronesia (NMC)"],
        [198, "New Caledonia (NMC)"],
        [199, "Niue"],
        [200, "Papua New Guinea (NMC)"],
        [201, "Philippines (NMC)"],
        [202, "Samoa (NMC)"],
        [203, "Solomon Islands (NMC)"],
        [204, "National Institute of Water and Atmospheric Research (NIWA - New Zealand)"],
        [210, "Frascati (ESA/ESRIN)"],
        [211, "Lannion"],
        [212, "Lisbon"],
        [213, "Reykjavik"],
        [214, "Madrid"],
        [215, "Zurich"],
        [216, "Service ARGOS - Toulouse"],
        [217, "Bratislava"],
        [218, "Budapest"],
        [219, "Ljubljana"],
        [220, "Warsaw"],
        [221, "Zagreb"],
        [222, "Albania (NMC)"],
        [223, "Armenia (NMC)"],
        [224, "Austria (NMC)"],
        [225, "Azerbaijan (NMC)"],
        [226, "Belarus (NMC)"],
        [227, "Belgium (NMC)"],
        [228, "Bosnia and Herzegovina (NMC)"],
        [229, "Bulgaria (NMC)"],
        [230, "Cyprus (NMC)"],
        [231, "Estonia (NMC)"],
        [232, "Georgia (NMC)"],
        [233, "Dublin"],
        [234, "Israel (NMC)"],
        [235, "Jordan (NMC)"],
        [236, "Latvia (NMC)"],
        [237, "Lebanon (NMC)"],
        [238, "Lithuania (NMC)"],
        [239, "Luxembourg"],
        [240, "Malta (NMC)"],
        [241, "Monaco"],
        [242, "Romania (NMC)"],
        [243, "Syrian Arab Republic (NMC)"],
        [244, "The former Yugoslav Republic of Macedonia (NMC)"],
        [245, "Ukraine (NMC)"],
        [246, "Republic of Moldova (NMC)"],
        [247, "Operational Programme for the Exchange of weather RAdar information (OPERA) - EUMETNET"],
        [248, "Montenegro (NMC)"],
        [249, "Barcelona Dust Forecast Center"],
        [250, "COnsortium for Small scale MOdelling  (COSMO)"],
        [251, "Meteorological Cooperation on Operational NWP (MetCoOp)"],
        [252, "Max Planck Institute for Meteorology (MPI-M)"],
        [254, "EUMETSAT Operation Centre"],
        [255, "Missing"],
        [null, key]
    ]);
};

exports.IdentificationOfSubCentre = function (obj) {
    var key = obj.IdentificationOfSubCentre;
    obj.meta.IdentificationOfSubCentre = echo(key, [
        [255, "Missing"],
        [null, key]
    ]);
};

exports.MasterTablesVersionNumber = function (obj) {
    var key = obj.MasterTablesVersionNumber;
    obj.meta.MasterTablesVersionNumber = echo(key, [
        [0, "Experimental"],
        [1, "Version implemented on 7 November 2001"],
        [2, "Version implemented on 4 November 2003"],
        [3, "Version implemented on 2 November 2005"],
        [4, "Version implemented on 7 November 2007"],
        [5, "Version Implemented on 4 November 2009"],
        [6, "Version Implemented on 15 September 2010"],
        [7, "Version Implemented on 4 May 2011"],
        [8, "Version Implemented on 8 November 2011"],
        [9, "Version Implemented on 2 May 2012"],
        [10, "Version Implemented on 7 November 2012 "],
        [11, "Version Implemented on 8 May 2013"],
        [12, "Version Implemented on 14 November 2013"],
        [13, "Version Implemented on 7 May 2014"],
        [14, "Version Implemented on 5 November 2014"],
        [15, "Version Implemented on 6 May 2015"],
        [16, "Pre-operational to be implemented by next amendment"],
        [255, "Missing"],
        [null, key]
    ]);
};

exports.LocalTablesVersionNumber = function (obj) {
    var key = obj.LocalTablesVersionNumber;
    obj.meta.LocalTablesVersionNumber = echo(key, [
        [0, "Local tables not used. Only table entries and templates from the current Master table are valid."],
        [255, "Missing"],
        [null, key]
    ]);
};

exports.SignificanceOfReferenceTime = function (obj) {
    var key = obj.SignificanceOfReferenceTime;
    obj.meta.SignificanceOfReferenceTime = echo(key, [
        [0, "Analysis"],
        [1, "Start of forecast"],
        [2, "Verifying time of forecast"],
        [3, "Observation time"],
        [255, "Missing"],
        [null, key]
    ]);
};

exports.ProductionStatusOfData = function (obj) {
    var key = obj.ProductionStatusOfData;
    obj.meta.ProductionStatusOfData = echo(key, [
        [0, "Operational products"],
        [1, "Operational test products"],
        [2, "Research products"],
        [3, "Re-analysis products"],
        [255, "Missing"],
        [null, key]
    ]);
};

exports.TypeOfData = function (obj) {
    var key = obj.TypeOfData;
    obj.meta.TypeOfData = echo(key, [
        [0, "Analysis products"],
        [1, "Forecast products"],
        [2, "Analysis and forecast products"],
        [3, "Control forecast products"],
        [4, "Perturbed forecast products"],
        [5, "Control and perturbed forecast products"],
        [6, "Processed satellite observations"],
        [7, "Processed radar observations"],
        [255, "Missing"],
        [null, key]
    ]);
};

exports.ProductDefinitionTemplateNumber = function (obj) {
    var key = obj.ProductDefinitionTemplateNumber;
    obj.meta.ProductDefinitionTemplateNumber = echo(key, [
        [0, "Analysis or forecast at a horizontal level or in a horizontal layer at a point in time. (see Template 4.0)"],
        [1, "Individual ensemble forecast, control and perturbed, at a horizontal level or in a horizontal layer at a point in time. (see Template 4.1)"],
        [2, "Derived forecasts based on all ensemble members at a horizontal level or in a horizontal layer at a point in time. (see Template 4.2)"],
        [3, "Derived forecasts based on a cluster of ensemble members over a rectangular area at a horizontal level or in a horizontal layer at a point in time. (see Template 4.3)"],
        [4, "Derived forecasts based on a cluster of ensemble members over a circular area at a horizontal level or in a horizontal layer at a point in time. (see Template 4.4)"],
        [5, "Probability forecasts at a horizontal level or in a horizontal layer at a point in time. (see Template 4.5)"],
        [6, "Percentile forecasts at a horizontal level or in a horizontal layer at a point in time. (see Template 4.6)"],
        [7, "Analysis or forecast error at a horizontal level or in a horizontal layer at a point in time. (see Template 4.7)"],
        [8, "Average, accumulation, extreme values or other statistically processed values at a horizontal level or in a horizontal layer in a continuous or non-continuous time interval. (see Template 4.8)"],
        [9, "Probability forecasts at a horizontal level or in a horizontal layer in a continuous or non-continuous time interval. (see Template 4.9)"],
        [10, "Percentile forecasts at a horizontal level or in a horizontal layer in a continuous or non-continuous time interval. (see Template 4.10)"],
        [11, "Individual ensemble forecast, control and perturbed, at a horizontal level or in a horizontal layer, in a continuous or non-continuous time interval. (see Template 4.11)"],
        [12, "Derived forecasts based on all ensemble members at a horizontal level or in a horizontal layer, in a continuous or non-continuous time interval. (see Template 4.12)"],
        [13, "Derived forecasts based on a cluster of ensemble members over a rectangular area at a horizontal level or in a horizontal layer, in a continuous or non-continuous time interval. (see Template 4.13)"],
        [14, "Derived forecasts based on a cluster of ensemble members over a circular area at a horizontal level or in a horizontal layer, in a continuous or non-continuous time interval. (see Template 4.14)"],
        [15, "Average, accumulation, extreme values or other statistically-processed values over a spatial area at a horizontal level or in a horizontal layer at a point in time. (see Template 4.15)"],
        [20, "Radar product (see Template 4.20)"],
        [30, "Satellite product (see Template 4.30) NOTE:This template is deprecated. Template 4.31 should be used instead."],
        [31, "Satellite product (see Template 4.31)"],
        [32, "Analysis or forecast at a horizontal level or in a horizontal layer at a point in time for simulate (synthetic) staellite data (see Template 4.32)"],
        [40, "Analysis or forecast at a horizontal level or in a horizontal layer at a point in time for atmospheric chemical constituents. (see Template 4.40)"],
        [41, "Individual ensemble forecast, control and perturbed, at a horizontal level or in a horizontal layer at a point in time for atmospheric chemical constituents. (see Template 4.41)"],
        [42, "Average, accumulation, and/or extreme values or other statistically processed values at a horizontal level or in a horizontal layer in a continuous or non-continuous time interval for atmospheric chemical constituents. (see Template 4.42)"],
        [43, "Individual ensemble forecast, control and perturbed, at a horizontal level or in a horizontal layer, in a continuous or non-continuous time interval for atmospheric chemical constituents. (see Template 4.43)"],
        [44, "Analysis or forecast at a horizontal level or in a horizontal layer at a point in time for aerosol. (see Template 4.44)"],
        [45, "Individual ensemble forecast, control and perturbed, at a horizontal level or in a horizontal layer, in a continuous or non-continuous time interval for aerosol. (see Template 4.45)"],
        [46, "Average, accumulation, and/or extreme values or other statistically processed values at a horizontal level or in a horizontal layer in a continuous or non-continuous time interval for aerosol. (see Template 4.46)"],
        [47, "Individual ensemble forecast, control and perturbed, at a horizontal level or in a horizontal layer, in a continuous or non-continuous time interval for aerosol. (see Template 4.47)"],
        [48, "Analysis or forecast at a horizontal level or in a horizontal layer at a point in time for aerosol. (see Template 4.48)"],
        [51, "Categorical forecast at a horizontal level or in a horizontal layer at a point in time. (see Template 4.51)"],
        [91, "Categorical forecast at a horizontal level or in a horizontal layer in a continuous or non-continuous time interval. (see Template 4.91)"],
        [254, "CCITT IA5 character string (see Template 4.254)"],
        [1000, "Cross-section of analysis and forecast at a point in time. (see Template 4.1000)"],
        [1001, "Cross-section of averaged or otherwise statistically processed analysis or forecast over a range of time. (see Template 4.1001)"],
        [1002, "Cross-section of analysis and forecast, averaged or otherwise statistically-processed over latitude or longitude. (see Template 4.1002)"],
        [1100, "Hovmoller-type grid with no averaging or other statistical processing (see Template 4.1100)"],
        [1101, "Hovmoller-type grid with averaging or other statistical processing (see Template 4.1101)"],
        [65535, "Missing"],
        [null, key]
    ]);
};

exports.TypeOfFirstFixedSurface = function (obj) {
    var key = obj.TypeOfFirstFixedSurface;
    obj.meta.TypeOfFirstFixedSurface = echo(key, [
        [1, "Ground or Water Surface"],
        [2, "Cloud Base Level"],
        [3, "Level of Cloud Tops"],
        [4, "Level of 0o C Isotherm"],
        [5, "Level of Adiabatic Condensation Lifted from the Surface"],
        [6, "Maximum Wind Level"],
        [7, "Tropopause"],
        [8, "Nominal Top of the Atmosphere"],
        [9, "Sea Bottom"],
        [10, "Entire Atmosphere"],
        [11, "Cumulonimbus Base (CB)"],
        [12, "Cumulonimbus Top (CT)"],
        [20, "Isothermal Level"],
        [100, "Isobaric Surface"],
        [101, "Mean Sea Level"],
        [102, "Specific Altitude Above Mean Sea Level"],
        [103, "Specified Height Level Above Ground"],
        [104, "Sigma Level"],
        [105, "Hybrid Level"],
        [106, "Depth Below Land Surface"],
        [107, "Isentropic (theta) Level"],
        [108, "Level at Specified Pressure Difference from Ground to Level"],
        [109, "Potential Vorticity Surface"],
        [111, "Eta Level"],
        [113, "Logarithmic Hybrid Level"],
        [114, "Snow Level"],
        [117, "Mixed Layer Depth"],
        [118, "Hybrid Height Level"],
        [119, "Hybrid Pressure Level"],
        [150, "Generalized Vertical Height Coordinate (see Note 5)"],
        [160, "Depth Below Sea Level"],
        [161, "Depth Below Water Surface"],
        [162, "Lake or River Bottom"],
        [163, "Bottom Of Sediment Layer"],
        [164, "Bottom Of Thermally Active Sediment Layer"],
        [165, "Bottom Of Sediment Layer Penetrated By Thermal Wave"],
        [166, "Maxing Layer"],
        [200, "Entire atmosphere (considered as a single layer)"],
        [201, "Entire ocean (considered as a single layer)"],
        [204, "Highest tropospheric freezing level"],
        [206, "Grid scale cloud bottom level"],
        [207, "Grid scale cloud top level"],
        [209, "Boundary layer cloud bottom level"],
        [210, "Boundary layer cloud top level"],
        [211, "Boundary layer cloud layer"],
        [212, "Low cloud bottom level"],
        [213, "Low cloud top level"],
        [214, "Low cloud layer"],
        [215, "Cloud ceiling"],
        [220, "Planetary Boundary Layer"],
        [221, "Layer Between Two Hybrid Levels"],
        [222, "Middle cloud bottom level"],
        [223, "Middle cloud top level"],
        [224, "Middle cloud layer"],
        [232, "High cloud bottom level"],
        [233, "High cloud top level"],
        [234, "High cloud layer"],
        [235, "Ocean Isotherm Level (1/10  C)"],
        [236, "Layer between two depths below ocean surface"],
        [237, "Bottom of Ocean Mixed Layer (m)"],
        [238, "Bottom of Ocean Isothermal Layer (m)"],
        [239, "Layer Ocean Surface and 26C Ocean Isothermal Level"],
        [240, "Ocean Mixed Layer"],
        [241, "Ordered Sequence of Data"],
        [242, "Convective cloud bottom level"],
        [243, "Convective cloud top level"],
        [244, "Convective cloud layer"],
        [245, "Lowest level of the wet bulb zero"],
        [246, "Maximum equivalent potential temperature level"],
        [247, "Equilibrium level"],
        [248, "Shallow convective cloud bottom level"],
        [249, "Shallow convective cloud top level"],
        [251, "Deep convective cloud bottom level"],
        [252, "Deep convective cloud top level"],
        [253, "Lowest bottom level of supercooled liquid water layer"],
        [254, "Highest top level of supercooled liquid water layer"],
        [255, "Missing"],
        [null, key]
    ]);
};

exports.DataRepresentationTemplateNumber = function (obj) {
    var key = obj.DataRepresentationTemplateNumber;
    obj.meta.DataRepresentationTemplateNumber = echo(key, [
        [0, "Grid point data - simple packing"],
        [1, "Matrix value - simple packing"],
        [2, "Grid point data - complex packing"],
        [3, "Grid point data - complex packing and spatial differencing"],
        [4, "Grid point data – IEEE floating point data"],
        [40, "Grid point data – JPEG 2000 Code Stream Format"],
        [41, "Grid point data – Portable Network Graphics (PNG)"],
        [50, "Spectral data -simple packing"],
        [51, "Spherical harmonics data - complex packing"],
        [61, "Grid point data - simple packing with logarithm pre-processing"],
        [65535, "Missing"],
        [null, key]
    ]);
};

exports.Bitmap_Indicator = function (obj) {
    var key = obj.Bitmap_Indicator;
    obj.meta.Bitmap_Indicator = echo(key, [
        [0, "A bit map applies to this product and is specified in this Section."],
        [254, "A bit map defined previously in the same GRIB message applies to this product."],
        [255, "A bit map does not apply to this product."],
        [null, key]
    ]);
};

exports.CategoryOfParametersByProductDiscipline = function (obj) {
    var key = obj.CategoryOfParametersByProductDiscipline;
    obj.meta.CategoryOfParametersByProductDiscipline = echo(key, [
        [0, "Temperature"],
        [1, "Moisture"],
        [2, "Momentum"],
        [3, "Mass"],
        [4, "Short-wave Radiation"],
        [5, "Long-wave Radiation"],
        [6, "Cloud"],
        [7, "Thermodynamic Stability indices"],
        [8, "Kinematic Stability indices"],
        [9, "Temperature Probabilities"],
        [10, "Moisture Probabilities"],
        [11, "Momentum Probabilities"],
        [12, "Mass Probabilities"],
        [13, "Aerosols"],
        [14, "Trace gases (e.g., ozone, CO2)"],
        [15, "Radar"],
        [16, "Forecast Radar Imagery"],
        [17, "Electro-dynamics"],
        [18, "Nuclear/radiology"],
        [19, "Physical atmospheric properties"],
        [190, "CCITT IA5 string"],
        [191, "Miscellaneous"],
        [255, "Missing"],
        [null, key]
    ]);
};

exports.ParameterNumberByProductDisciplineAndParameterCategory_0_0 = function (obj) {
    var key = obj.ParameterNumberByProductDisciplineAndParameterCategory;
    obj.meta.ParameterNumberByProductDisciplineAndParameterCategory = echo(key, [
        [0, "Temperature(K)"],
        [1, "Virtual Temperature(K)"],
        [2, "Potential Temperature(K)"],
        [3, "Pseudo-Adiabatic Potential Temperature (or Equivalent Potential Temperature)(K)"],
        [4, "Maximum Temperature*(K)"],
        [5, "Minimum Temperature*(K)"],
        [6, "Dew Point Temperature(K)"],
        [7, "Dew Point Depression (or Deficit)(K)"],
        [8, "Lapse Rate(K m-1)"],
        [9, "Temperature Anomaly(K)"],
        [10, "Latent Heat Net Flux(W m-2)"],
        [11, "Sensible Heat Net Flux(W m-2)"],
        [12, "Heat Index(K)"],
        [13, "Wind Chill Factor(K)"],
        [14, "Minimum Dew Point Depression*(K)"],
        [15, "Virtual Potential Temperature(K)"],
        [16, "Snow Phase Change Heat Flux(W m-2)"],
        [17, "Skin Temperature(K)"],
        [18, "Snow Temperature (top of snow)(K)"],
        [19, "Turbulent Transfer Coefficient for Heat(Numeric)"],
        [20, "Turbulent Diffusion Coefficient for Heat(m2s-1)"],
        [192, "Snow Phase Change Heat Flux(W m-2)"],
        [193, "Temperature Tendency by All Radiation(K s-1)"],
        [194, "Relative Error Variance()"],
        [195, "Large Scale Condensate Heating Rate(K/s)"],
        [196, "Deep Convective Heating Rate(K/s)"],
        [197, "Total Downward Heat Flux at Surface(W m-2)"],
        [198, "Temperature Tendency by All Physics(K s-1)"],
        [199, "Temperature Tendency by Non-radiation Physics(K s-1)"],
        [200, "Standard Dev. of IR Temp. over 1x1 deg. area(K)"],
        [201, "Shallow Convective Heating Rate(K/s)"],
        [202, "Vertical Diffusion Heating rate(K/s)"],
        [203, "Potential Temperature at Top of Viscous Sublayer(K)"],
        [204, "Tropical Cyclone Heat Potential(J/m2K)"],
        [255, "Missing"],
        [null, nf0(key)]
    ]);
};

exports.ParameterNumberByProductDisciplineAndParameterCategory_0_1 = function (obj) {
    var key = obj.ParameterNumberByProductDisciplineAndParameterCategory;
    obj.meta.ParameterNumberByProductDisciplineAndParameterCategory = echo(key, [
        [0, "Specific Humidity(kg kg-1)"],
        [1, "Relative Humidity(%)"],
        [2, "Humidity Mixing Ratio(kg kg-1)"],
        [3, "Precipitable Water(kg m-2)"],
        [4, "Vapour Pressure(Pa)"],
        [5, "Saturation Deficit(Pa)"],
        [6, "Evaporation(kg m-2)"],
        [7, "Precipitation Rate *(kg m-2 s-1)"],
        [8, "Total Precipitation ***(kg m-2)"],
        [9, "Large-Scale Precipitation (non-convective) ***(kg m-2)"],
        [10, "Convective Precipitation ***(kg m-2)"],
        [11, "Snow Depth(m)"],
        [12, "Snowfall Rate Water Equivalent *(kg m-2 s-1)"],
        [13, "Water Equivalent of Accumulated Snow Depth ***(kg m-2)"],
        [14, "Convective Snow ***(kg m-2)"],
        [15, "Large-Scale Snow ***(kg m-2)"],
        [16, "Snow Melt(kg m-2)"],
        [17, "Snow Age(day)"],
        [18, "Absolute Humidity(kg m-3)"],
        [19, "Precipitation Type(See Table 4.201)"],
        [20, "Integrated Liquid Water(kg m-2)"],
        [21, "Condensate(kg kg-1)"],
        [22, "Cloud Mixing Ratio(kg kg-1)"],
        [23, "Ice Water Mixing Ratio(kg kg-1)"],
        [24, "Rain Mixing Ratio(kg kg-1)"],
        [25, "Snow Mixing Ratio(kg kg-1)"],
        [26, "Horizontal Moisture Convergence(kg kg-1 s-1)"],
        [27, "Maximum Relative Humidity *(%)"],
        [28, "Maximum Absolute Humidity *(kg m-3)"],
        [29, "Total Snowfall ***(m)"],
        [30, "Precipitable Water Category(See Table 4.202)"],
        [31, "Hail(m)"],
        [32, "Graupel(kg kg-1)"],
        [33, "Categorical Rain(Code table 4.222)"],
        [34, "Categorical Freezing Rain(Code table 4.222)"],
        [35, "Categorical Ice Pellets(Code table 4.222)"],
        [36, "Categorical Snow(Code table 4.222)"],
        [37, "Convective Precipitation Rate(kg m-2 s-1)"],
        [38, "Horizontal Moisture Divergence(kg kg-1 s-1)"],
        [39, "Percent frozen precipitation(%)"],
        [40, "Potential Evaporation(kg m-2)"],
        [41, "Potential Evaporation Rate(W m-2)"],
        [42, "Snow Cover(%)"],
        [43, "Rain Fraction of Total Cloud Water(Proportion)"],
        [44, "Rime Factor(Numeric)"],
        [45, "Total Column Integrated Rain(kg m-2)"],
        [46, "Total Column Integrated Snow(kg m-2)"],
        [47, "Large Scale Water Precipitation (Non-Convective) ***(kg m-2)"],
        [48, "Convective Water Precipitation ***(kg m-2)"],
        [49, "Total Water Precipitation ***(kg m-2)"],
        [50, "Total Snow Precipitation ***(kg m-2)"],
        [51, "Total Column Water (Vertically integrated total water (vapour+cloud water/ice)(kg m-2)"],
        [52, "Total Precipitation Rate **(kg m-2 s-1)"],
        [53, "Total Snowfall Rate Water Equivalent **(kg m-2 s-1)"],
        [54, "Large Scale Precipitation Rate(kg m-2 s-1)"],
        [55, "Convective Snowfall Rate Water Equivalent(kg m-2 s-1)"],
        [56, "Large Scale Snowfall Rate Water Equivalent(kg m-2 s-1)"],
        [57, "Total Snowfall Rate(m s-1)"],
        [58, "Convective Snowfall Rate(m s-1)"],
        [59, "Large Scale Snowfall Rate(m s-1)"],
        [60, "Snow Depth Water Equivalent(kg m-2)"],
        [61, "Snow Density(kg m-3)"],
        [62, "Snow Evaporation(kg m-2)"],
        [64, "Total Column Integrated Water Vapour(kg m-2)"],
        [65, "Rain Precipitation Rate(kg m-2 s-1)"],
        [66, "Snow Precipitation Rate(kg m-2 s-1)"],
        [67, "Freezing Rain Precipitation Rate(kg m-2 s-1)"],
        [68, "Ice Pellets Precipitation Rate(kg m-2 s-1)"],
        [69, "Total Column Integrate Cloud Water(kg m-2)"],
        [70, "Total Column Integrate Cloud Ice(kg m-2)"],
        [71, "Hail Mixing Ratio(kg kg-1)"],
        [72, "Total Column Integrate Hail(kg m-2)"],
        [73, "Hail Prepitation Rate(kg m-2 s-1)"],
        [74, "Total Column Integrate Graupel(kg m-2)"],
        [75, "Graupel (Snow Pellets) Prepitation Rate(kg m-2 s-1)"],
        [76, "Convective Rain Rate(kg m-2 s-1)"],
        [77, "Large Scale Rain Rate(kg m-2 s-1)"],
        [78, "Total Column Integrate Water (All components including precipitation)(kg m-2)"],
        [79, "Evaporation Rate(kg m-2 s-1)"],
        [80, "Total Condensatea(kg kg-1)"],
        [81, "Total Column-Integrate Condensate(kg m-2)"],
        [82, "Cloud Ice Mixing Ratio(kg kg-1)"],
        [83, "Specific Cloud Liquid Water Content(kg kg-1)"],
        [84, "Specific Cloud Ice Water Content(kg kg-1)"],
        [85, "Specific Rain Water Content(kg kg-1)"],
        [86, "Specific Snow Water Content(kg kg-1)"],
        [90, "Total Kinematic Moisture Flux(kg kg-1 m s-1)"],
        [91, "U-component (zonal) Kinematic Moisture Flux(kg kg-1 m s-1)"],
        [92, "V-component (meridional) Kinematic Moisture Flux(kg kg-1 m s-1)"],
        [192, "Categorical Rain(Code table 4.222)"],
        [193, "Categorical Freezing Rain(Code table 4.222)"],
        [194, "Categorical Ice Pellets(Code table 4.222)"],
        [195, "Categorical Snow(Code table 4.222)"],
        [196, "Convective Precipitation Rate(kg m-2 s-1)"],
        [197, "Horizontal Moisture Divergence(kg kg-1 s-1)"],
        [198, "Minimum Relative Humidity(%)"],
        [199, "Potential Evaporation(kg m-2)"],
        [200, "Potential Evaporation Rate(W m-2)"],
        [201, "Snow Cover(%)"],
        [202, "Rain Fraction of Total Liquid Water(non-dim)"],
        [203, "Rime Factor(non-dim)"],
        [204, "Total Column Integrated Rain(kg m-2)"],
        [205, "Total Column Integrated Snow(kg m-2)"],
        [206, "Total Icing Potential Diagnostic(non-dim)"],
        [207, "Number concentration for ice particles(non-dim)"],
        [208, "Snow temperature(K)"],
        [209, "Total column-integrated supercooled liquid water(kg m-2)"],
        [210, "Total column-integrated melting ice(kg m-2)"],
        [211, "Evaporation - Precipitation(cm/day)"],
        [212, "Sublimation (evaporation from snow)(W m-2)"],
        [213, "Deep Convective Moistening Rate(kg kg-1 s-1)"],
        [214, "Shallow Convective Moistening Rate(kg kg-1 s-1)"],
        [215, "Vertical Diffusion Moistening Rate(kg kg-1 s-1)"],
        [216, "Condensation Pressure of Parcali Lifted From Indicate Surface(Pa)"],
        [217, "Large scale moistening rate(kg kg-1 s-1)"],
        [218, "Specific humidity at top of viscous sublayer(kg kg-1)"],
        [219, "Maximum specific humidity at 2m(kg kg-1)"],
        [220, "Minimum specific humidity at 2m(kg kg-1)"],
        [221, "Liquid precipitation (Rainfall)(kg m-2)"],
        [222, "Snow temperature, depth-avg(K)"],
        [223, "Total precipitation (nearest grid point)(kg m-2)"],
        [224, "Convective precipitation (nearest grid point)(kg m-2)"],
        [225, "Freezing Rain(kg m-2)"],
        [226, "Predominant Weather(Numeric (See note 1))"],
        [227, "Frozen Rain(kg m-2)"],
        [241, "Total Snow(kg m-2)"],
        [242, "Relative Humidity with Respect to Precipitable Water(%)"],
        [255, "Missing"],
        [null, nf0(key)]
    ]);
};

exports.ParameterNumberByProductDisciplineAndParameterCategory_0_2 = function (obj) {
    var key = obj.ParameterNumberByProductDisciplineAndParameterCategory;
    obj.meta.ParameterNumberByProductDisciplineAndParameterCategory = echo(key, [
        [0, "Wind Direction (from whichIs blowing)(true)"],
        [1, "Wind Speed(m s-1)"],
        [2, "U-Component of Wind(m s-1)"],
        [3, "V-Component of Wind(m s-1)"],
        [4, "Stream Function(m2 s-1)"],
        [5, "Velocity Potential(m2 s-1)"],
        [6, "Montgomery Stream Function(m2 s-2)"],
        [7, "Sigma Coordinate Vertical Velocity(s-1)"],
        [8, "Vertical Velocity (Pressure)(Pa s-1)"],
        [9, "Vertical Velocity (Geometric)(m s-1)"],
        [10, "Absolute Vorticity(s-1)"],
        [11, "Absolute Divergence(s-1)"],
        [12, "Relative Vorticity(s-1)"],
        [13, "Relative Divergence(s-1)"],
        [14, "Potential Vorticity(K m2 kg-1 s-1)"],
        [15, "Vertical U-Component Shear(s-1)"],
        [16, "Vertical V-Component Shear(s-1)"],
        [17, "Momentum Flux, U-Component(N m-2)"],
        [18, "Momentum Flux, V-Component(N m-2)"],
        [19, "Wind Mixing Energy(J)"],
        [20, "Boundary Layer Dissipation(W m-2)"],
        [21, "Maximum Wind Speed *(m s-1)"],
        [22, "Wind Speed (Gust)(m s-1)"],
        [23, "U-Component of Wind (Gust)(m s-1)"],
        [24, "V-Component of Wind (Gust)(m s-1)"],
        [25, "Vertical Speed Shear(s-1)"],
        [26, "Horizontal Momentum Flux(N m-2)"],
        [27, "U-Component Storm Motion(m s-1)"],
        [28, "V-Component Storm Motion(m s-1)"],
        [29, "Drag Coefficient(Numeric)"],
        [30, "Frictional Velocity(m s-1)"],
        [31, "Turbulent Diffusion Coefficient for Momentum(m2 s-1)"],
        [32, "Eta Coordinate Vertical Velocity(s-1)"],
        [33, "Wind Fetch(m)"],
        [34, "Normal Wind Component **(m s-1)"],
        [35, "Tangential Wind Component **(m s-1)"],
        [192, "Vertical Speed Shear(s-1)"],
        [193, "Horizontal Momentum Flux(N m-2)"],
        [194, "U-Component Storm Motion(m s-1)"],
        [195, "V-Component Storm Motion(m s-1)"],
        [196, "Drag Coefficient(non-dim)"],
        [197, "Frictional Velocity(m s-1)"],
        [198, "Latitude of U Wind Component of Velocity(deg)"],
        [199, "Longitude of U Wind Component of Velocity(deg)"],
        [200, "Latitude of V Wind Component of Velocity(deg)"],
        [201, "Longitude of V Wind Component of Velocity(deg)"],
        [202, "Latitude of Presure Point(deg)"],
        [203, "Longitude of Presure Point(deg)"],
        [204, "Vertical Eddy Diffusivity Heat exchange(m2 s-1)"],
        [205, "Covariance between Meridional and Zonal Components of the wind.(m2 s-2)"],
        [206, "Covariance between Temperature and Zonal Components of the wind.(K*m s-1)"],
        [207, "Covariance between Temperature and Meridional Components of the wind.(K*m s-1)"],
        [208, "Vertical Diffusion Zonal Acceleration(m s-2)"],
        [209, "Vertical Diffusion Meridional Acceleration(m s-2)"],
        [210, "Gravity wave drag zonal acceleration(m s-2)"],
        [211, "Gravity wave drag meridional acceleration(m s-2)"],
        [212, "Convective zonal momentum mixing acceleration(m s-2)"],
        [213, "Convective meridional momentum mixing acceleration(m s-2)"],
        [214, "Tendency of vertical velocity(m s-2)"],
        [215, "Omega (Dp/Dt) divide by density(K)"],
        [216, "Convective Gravity wave drag zonal acceleration(m s-2)"],
        [217, "Convective Gravity wave drag meridional acceleration(m s-2)"],
        [218, "Velocity Point Model Surface()"],
        [219, "Potential Vorticity (Mass-Weighted)(1/s/m)"],
        [220, "Hourly Maximum of Upward Vertical Velocity in the lowest 400hPa(m s-1)"],
        [221, "Hourly Maximum of Downward Vertical Velocity in the lowest 400hPa(m s-1)"],
        [222, "U Component of Hourly Maximum 10m Wind Speed(m s-1)"],
        [223, "V Component of Hourly Maximum 10m Wind Speed(m s-1)"],
        [224, "Ventilation Rate(m2 s-1)"],

        [255, "Missing"],
        [null, nf0(key)]
    ]);
};

exports.ParameterNumberByProductDisciplineAndParameterCategory_0_3 = function (obj) {
    var key = obj.ParameterNumberByProductDisciplineAndParameterCategory;
    obj.meta.ParameterNumberByProductDisciplineAndParameterCategory = echo(key, [
        [0, "Pressure(Pa)"],
        [1, "Pressure Reduced to MSL(Pa)"],
        [2, "Pressure Tendency(Pa s-1)"],
        [3, "ICAO Standard Atmosphere Reference Height(m)"],
        [4, "Geopotential(m2 s-2)"],
        [5, "Geopotential Height(gpm)"],
        [6, "Geometric Height(m)"],
        [7, "Standard Deviation of Height(m)"],
        [8, "Pressure Anomaly(Pa)"],
        [9, "Geopotential Height Anomaly(gpm)"],
        [10, "Density(kg m-3)"],
        [11, "Altimeter Setting(Pa)"],
        [12, "Thickness(m)"],
        [13, "Pressure Altitude(m)"],
        [14, "Density Altitude(m)"],
        [15, "5-Wave Geopotential Height(gpm)"],
        [16, "Zonal Flux of Gravity Wave Stress(N m-2)"],
        [17, "Meridional Flux of Gravity Wave Stress(N m-2)"],
        [18, "Planetary Boundary Layer Height(m)"],
        [19, "5-Wave Geopotential Height Anomaly(gpm)"],
        [20, "Standard Deviation of Sub-Grid Scale Orography(m)"],
        [21, "Angle of Sub-Grid Scale Orography(rad)"],
        [22, "Slope of Sub-Grid Scale Orography(Numeric)"],
        [23, "Gravity Wave Dissipation(W m-2)"],
        [24, "Anisotropy of Sub-Grid Scale Orography(Numeric)"],
        [25, "Natural Logarithm of Pressure in Pa(Numeric)"],
        [26, "Exner Pressure(Numeric)"],
        [192, "MSLP (Eta model reduction)(Pa)"],
        [193, "5-Wave Geopotential Height(gpm)"],
        [194, "Zonal Flux of Gravity Wave Stress(N m-2)"],
        [195, "Meridional Flux of Gravity Wave Stress(N m-2)"],
        [196, "Planetary Boundary Layer Height(m)"],
        [197, "5-Wave Geopotential Height Anomaly(gpm)"],
        [198, "MSLP (MAPS System Reduction)(Pa)"],
        [199, "3-hr pressure tendency (Std. Atmos. Reduction)(Pa s-1)"],
        [200, "Pressure of level from whichIs parcel was lifted(Pa)"],
        [201, "X-gradient of Log Pressure(m-1)"],
        [202, "Y-gradient of Log Pressure(m-1)"],
        [203, "X-gradient of Height(m-1)"],
        [204, "Y-gradient of Height(m-1)"],
        [205, "Layer Thickness(m)"],
        [206, "Natural Log of Surface Pressure(ln (kPa))"],
        [207, "Convective updraft mass flux(kg m-2 s-1)"],
        [208, "Convective downdraft mass flux(kg m-2 s-1)"],
        [209, "Convective detrainment mass flux(kg m-2 s-1)"],
        [210, "Mass Point Model Surface()"],
        [211, "Geopotential Height (nearest grid point)(gpm)"],
        [212, "Pressure (nearest grid point)(Pa)"],
        [255, "Missing"],
        [null, nf0(key)]
    ]);
};

exports.ParameterNumberByProductDisciplineAndParameterCategory_0_4 = function (obj) {
    var key = obj.ParameterNumberByProductDisciplineAndParameterCategory;
    obj.meta.ParameterNumberByProductDisciplineAndParameterCategory = echo(key, [
        [0, "Net Short-Wave Radiation Flux (Surface)*(W m-2)"],
        [1, "Net Short-Wave Radiation Flux (Top of Atmosphere)*(W m-2)"],
        [2, "Short-Wave Radiation Flux*(W m-2)"],
        [3, "Global Radiation Flux(W m-2)"],
        [4, "Brightness Temperature(K)"],
        [5, "Radiance (with respect to wave number)(W m-1 sr-1)"],
        [6, "Radiance (with respect to wavelength)(W m-3 sr-1)"],
        [7, "Downward Short-Wave Radiation Flux(W m-2)"],
        [8, "Upward Short-Wave Radiation Flux(W m-2)"],
        [9, "Net Short Wave Radiation Flux(W m-2)"],
        [10, "Photosynthetically Active Radiation(W m-2)"],
        [11, "Net Short-Wave Radiation Flux, Clear Sky(W m-2)"],
        [12, "Downward UV Radiation(W m-2)"],
        [50, "UV Index (Under Clear Sky)**(Numeric)"],
        [51, "UV Index**(W m-2)"],
        [192, "Downward Short-Wave Radiation Flux(W m-2)"],
        [193, "Upward Short-Wave Radiation Flux(W m-2)"],
        [194, "UV-B Downward Solar Flux(W m-2)"],
        [195, "Clear sky UV-B Downward Solar Flux(W m-2)"],
        [196, "Clear Sky Downward Solar Flux(W m-2)"],
        [197, "Solar Radiative Heating Rate(K s-1)"],
        [198, "Clear Sky Upward Solar Flux(W m-2)"],
        [199, "Cloud Forcing Net Solar Flux(W m-2)"],
        [200, "Visible Beam Downward Solar Flux(W m-2)"],
        [201, "Visible Diffuse Downward Solar Flux(W m-2)"],
        [202, "Near IR Beam Downward Solar Flux(W m-2)"],
        [203, "Near IR Diffuse Downward Solar Flux(W m-2)"],
        [204, "Downward Total Radiation Flux(W m-2)"],
        [205, "Upward Total Radiation Flux(W m-2)"],
        [255, "Missing"],
        [null, nf0(key)]
    ]);
};

exports.ParameterNumberByProductDisciplineAndParameterCategory_0_5 = function (obj) {
    var key = obj.ParameterNumberByProductDisciplineAndParameterCategory;
    obj.meta.ParameterNumberByProductDisciplineAndParameterCategory = echo(key, [
        [0, "Net Long-Wave Radiation Flux (Surface)*(W m-2)"],
        [1, "Net Long-Wave Radiation Flux (Top of Atmosphere)*(W m-2)"],
        [2, "Long-Wave Radiation Flux*(W m-2)"],
        [3, "Downward Long-Wave Rad. Flux(W m-2)"],
        [4, "Upward Long-Wave Rad. Flux(W m-2)"],
        [5, "Net Long-Wave Radiation Flux(W m-2)"],
        [6, "Net Long-Wave Radiation Flux, Clear Sky(W m-2)"],
        [192, "Downward Long-Wave Rad. Flux(W m-2)"],
        [193, "Upward Long-Wave Rad. Flux(W m-2)"],
        [194, "Long-Wave Radiative Heating Rate(K s-1)"],
        [195, "Clear Sky Upward Long Wave Flux(W m-2)"],
        [196, "Clear Sky Downward Long Wave Flux(W m-2)"],
        [197, "Cloud Forcing Net Long Wave Flux(W m-2)"],
        [255, "Missing"],
        [null, nf0(key)]
    ]);
};

exports.ParameterNumberByProductDisciplineAndParameterCategory_0_6 = function (obj) {
    var key = obj.ParameterNumberByProductDisciplineAndParameterCategory;
    obj.meta.ParameterNumberByProductDisciplineAndParameterCategory = echo(key, [
        [0, "Cloud Ice(kg m-2)"],
        [1, "Total Cloud Cover(%)"],
        [2, "Convective Cloud Cover(%)"],
        [3, "Low Cloud Cover(%)"],
        [4, "Medium Cloud Cover(%)"],
        [5, "High Cloud Cover(%)"],
        [6, "Cloud Water(kg m-2)"],
        [7, "Cloud Amount(%)"],
        [8, "Cloud Type(See Table 4.203)"],
        [9, "Thunderstorm Maximum Tops(m)"],
        [10, "Thunderstorm Coverage(See Table 4.204)"],
        [11, "Cloud Base(m)"],
        [12, "Cloud Top(m)"],
        [13, "Ceiling(m)"],
        [14, "Non-Convective Cloud Cover(%)"],
        [15, "Cloud Work Function(J kg-1)"],
        [16, "Convective Cloud Efficiency(Proportion)"],
        [17, "Total Condensate *(kg kg-1)"],
        [18, "Total Column-Integrated Cloud Water *(kg m-2)"],
        [19, "Total Column-Integrated Cloud Ice *(kg m-2)"],
        [20, "Total Column-Integrated Condensate *(kg m-2)"],
        [21, "Ice fraction of total condensate(Proportion)"],
        [22, "Cloud Cover(%)"],
        [23, "Cloud Ice Mixing Ratio *(kg kg-1)"],
        [24, "Sunshine(Numeric)"],
        [25, "Horizontal Extent of Cumulonimbus (CB)(%)"],
        [26, "Height of Convective Cloud Base(m)"],
        [27, "Height of Convective Cloud Top(m)"],
        [28, "Number Concentration of Cloud Droplets(kg-1)"],
        [29, "Number Concentration of Cloud Ice(kg-1)"],
        [30, "Number Density of Cloud Droplets(m-3)"],
        [31, "Number Density of Cloud Ice(m-3)"],
        [32, "Fraction of Cloud Cover(Numeric)"],
        [33, "Sunshine Duration(s)"],
        [34, "Surface Long Wave Effective Total Cloudiness(Numeric)"],
        [35, "Surface Short Wave Effective Total Cloudiness(Numeric)"],
        [192, "Non-Convective Cloud Cover(%)"],
        [193, "Cloud Work Function(J kg-1)"],
        [194, "Convective Cloud Efficiency(non-dim)"],
        [195, "Total Condensate(kg kg-1)"],
        [196, "Total Column-Integrated Cloud Water(kg m-2)"],
        [197, "Total Column-Integrated Cloud Ice(kg m-2)"],
        [198, "Total Column-Integrated Condensate(kg m-2)"],
        [199, "Ice fraction of total condensate(non-dim)"],
        [200, "Convective Cloud Mass Flux(Pa s-1)"],
        [201, "Sunshine Duration(s)"],
        [255, "Missing"],
        [null, nf0(key)]
    ]);
};

exports.ParameterNumberByProductDisciplineAndParameterCategory_0_7 = function (obj) {
    var key = obj.ParameterNumberByProductDisciplineAndParameterCategory;
    obj.meta.ParameterNumberByProductDisciplineAndParameterCategory = echo(key, [
        [0, "Parcel Lifted Index (to 500 hPa)(K)"],
        [1, "Best Lifted Index (to 500 hPa)(K)"],
        [2, "K Index(K)"],
        [3, "KO Index(K)"],
        [4, "Total Totals Index(K)"],
        [5, "Sweat Index(Numeric)"],
        [6, "Convective Available Potential Energy(J kg-1)"],
        [7, "Convective Inhibition(J kg-1)"],
        [8, "Storm Relative Helicity(m2 s-2)"],
        [9, "Energy Helicity Index(Numeric)"],
        [10, "Surface Lifted Index(K)"],
        [11, "Best (4 layer) Lifted Index(K)"],
        [12, "Richardson Number(Numeric)"],
        [13, "Showalter Index(K)"],
        [15, "Updraft Helicity(m2 s-2)"],
        [192, "Surface Lifted Index(K)"],
        [193, "Best (4 layer) Lifted Index(K)"],
        [194, "Richardson Number(Numeric)"],
        [195, "Convective Weather Detection Index()"],
        [196, "Ultra Violet Index(W m-2)"],
        [197, "Updraft Helicity(m2 s-2)"],
        [198, "Leaf Area Index()"],
        [199, "Hourly Maximum of Updraft Helicity over Layer 2km to 5 km AGL(m2 s-2)"],
        [255, "Missing"],
        [null, nf0(key)]
    ]);
};

exports.ParameterNumberByProductDisciplineAndParameterCategory_0_13 = function (obj) {
    var key = obj.ParameterNumberByProductDisciplineAndParameterCategory;
    obj.meta.ParameterNumberByProductDisciplineAndParameterCategory = echo(key, [
        [0, "Aerosol Type(See Table 4.205)"],
        [192, "Particulate matter (coarse)(g m-3)"],
        [193, "Particulate matter (fine)(g m-3)"],
        [194, "Particulate matter (fine)(log10 (g m-3))"],
        [195, "Integrated column particulate matter (fine)(log10 (g m-3))"],

        [255, "Missing"],
        [null, nf0(key)]
    ]);
};

exports.ParameterNumberByProductDisciplineAndParameterCategory_0_14 = function (obj) {
    var key = obj.ParameterNumberByProductDisciplineAndParameterCategory;
    obj.meta.ParameterNumberByProductDisciplineAndParameterCategory = echo(key, [
        [0, "Total Ozone(DU)"],
        [1, "Ozone Mixing Ratio(kg kg-1)"],
        [2, "Total Column Integrated Ozone(DU)"],
        [192, "Ozone Mixing Ratio(kg kg-1)"],
        [193, "Ozone Concentration(ppb)"],
        [194, "Categorical Ozone Concentration(Non-Dim)"],
        [195, "Ozone Vertical Diffusion(kg kg-1 s-1)"],
        [196, "Ozone Production(kg kg-1 s-1)"],
        [197, "Ozone Tendency(kg kg-1 s-1)"],
        [198, "Ozone Production from Temperature Term(kg kg-1 s-1)"],
        [199, "Ozone Production from Column Ozone Term(kg kg-1 s-1)"],
        [200, "Ozone Daily Max from 1-hour Average(ppbV)"],
        [201, "Ozone Daily Max from 8-hour Average(ppbV)"],
        [202, "PM 2.5 Daily Max from 1-hour Average(g m-3)"],
        [203, "PM 2.5 Daily Max from 24-hour Average(g m-3)"],
        [255, "Missing"],
        [null, nf0(key)]
    ]);
};

exports.ParameterNumberByProductDisciplineAndParameterCategory_0_15 = function (obj) {
    var key = obj.ParameterNumberByProductDisciplineAndParameterCategory;
    obj.meta.ParameterNumberByProductDisciplineAndParameterCategory = echo(key, [
        [0, "Base Spectrum Width(m s-1)"],
        [1, "Base Reflectivity(dB)"],
        [2, "Base Radial Velocity(m s-1)"],
        [3, "Vertically-Integrated Liquid Water(kg m-2)"],
        [4, "Layer Maximum Base Reflectivity(dB)"],
        [5, "Precipitation(kg m-2)"],
        [6, "Radar Spectra (1)()"],
        [7, "Radar Spectra (2)()"],
        [8, "Radar Spectra (3)()"],
        [9, "Reflectivity of Cloud Droplets(dB)"],
        [10, "Reflectivity of Cloud Ice(dB)"],
        [11, "Reflectivity of Snow(dB)"],
        [12, "Reflectivity of Rain(dB)"],
        [13, "Reflectivity of Graupel(dB)"],
        [14, "Reflectivity of Hail(dB)"],
        [255, "Missing"],
        [null, nf0(key)]
    ]);
};

exports.ParameterNumberByProductDisciplineAndParameterCategory_0_16 = function (obj) {
    var key = obj.ParameterNumberByProductDisciplineAndParameterCategory;
    obj.meta.ParameterNumberByProductDisciplineAndParameterCategory = echo(key, [
        [0, "Equivalent radar reflectivity factor for rain(m m6 m-3)"],
        [1, "Equivalent radar reflectivity factor for snow(m m6 m-3)"],
        [2, "Equivalent radar reflectivity factor for parameterized convection(m m6 m-3)"],
        [3, "Echo Top (See Note 1)(m)"],
        [4, "Reflectivity(dB)"],
        [5, "Composite reflectivity(dB)"],
        [192, "Equivalent radar reflectivity factor for rain(m m6 m-3)"],
        [193, "Equivalent radar reflectivity factor for snow(m m6 m-3)"],
        [194, "Equivalent radar reflectivity factor for parameterized convection(m m6 m-3)"],
        [195, "Reflectivity(dB)"],
        [196, "Composite reflectivity(dB)"],
        [197, "Echo Top (See Note 1)(m)"],
        [198, "Hourly Maximum of Simulated Reflectivity at 1 km AGL(dB)"],
        [255, "Missing"],
        [null, nf0(key)]
    ]);
};

exports.ParameterNumberByProductDisciplineAndParameterCategory_0_17 = function (obj) {
    var key = obj.ParameterNumberByProductDisciplineAndParameterCategory;
    obj.meta.ParameterNumberByProductDisciplineAndParameterCategory = echo(key, [
        [192, "Lightning(non-dim)"],

        [255, "Missing"],
        [null, nf0(key)]
    ]);
};

exports.ParameterNumberByProductDisciplineAndParameterCategory_0_18 = function (obj) {
    var key = obj.ParameterNumberByProductDisciplineAndParameterCategory;
    obj.meta.ParameterNumberByProductDisciplineAndParameterCategory = echo(key, [
        [0, "Air Concentration of Caesium 137(Bq m-3)"],
        [1, "Air Concentration of Iodine 131(Bq m-3)"],
        [2, "Air Concentration of Radioactive Pollutant(Bq m-3)"],
        [3, "Ground Deposition of Caesium 137(Bq m-2)"],
        [4, "Ground Deposition of Iodine 131(Bq m-2)"],
        [5, "Ground Deposition of Radioactive Pollutant(Bq m-2)"],
        [6, "Time Integrated Air Concentration of Cesium Pollutant See Note 1(Bq s m-3)"],
        [7, "Time Integrated Air Concentration of Iodine Pollutant See Note 1(Bq s m-3)"],
        [8, "Time Integrated Air Concentration of Radioactive Pollutant See Note 1(Bq s m-3)"],
        [10, "Air Concentration(Bq m-3)"],
        [11, "Wet Deposition(Bq m-2)"],
        [12, "Dry Deposition(Bq m-2)"],
        [13, "Total Deposition (Wet + Dry)(Bq m-2)"],

        [255, "Missing"],
        [null, nf0(key)]
    ]);
};

exports.ParameterNumberByProductDisciplineAndParameterCategory_0_19 = function (obj) {
    var key = obj.ParameterNumberByProductDisciplineAndParameterCategory;
    obj.meta.ParameterNumberByProductDisciplineAndParameterCategory = echo(key, [
        [0, "Visibility(m)"],
        [1, "Albedo(%)"],
        [2, "Thunderstorm Probability(%)"],
        [3, "Mixed Layer Depth(m)"],
        [4, "Volcanic Ash(See Table 4.206)"],
        [5, "Icing Top(m)"],
        [6, "Icing Base(m)"],
        [7, "Icing(See Table 4.207)"],
        [8, "Turbulence Top(m)"],
        [9, "Turbulence Base(m)"],
        [10, "Turbulence(See Table 4.208)"],
        [11, "Turbulent Kinetic Energy(J kg-1)"],
        [12, "Planetary Boundary Layer Regime(See Table 4.209)"],
        [13, "Contrail Intensity(See Table 4.210)"],
        [14, "Contrail Engine Type(See Table 4.211)"],
        [15, "Contrail Top(m)"],
        [16, "Contrail Base(m)"],
        [17, "Maximum Snow Albedosee Note 1(%)"],
        [18, "Snow-Free Albedo(%)"],
        [19, "Snow Albedo(%)"],
        [20, "Icing(%)"],
        [21, "In-Cloud Turbulence(%)"],
        [22, "Clear Air Turbulence (CAT)(%)"],
        [23, "Supercooled Large Droplet Probabilitysee Note 2(%)"],
        [24, "Convective Turbulent Kinetic Energy(J kg-1)"],
        [25, "Weather(See Table 4.225)"],
        [26, "Convective Outlook(See Table 4.224)"],
        [27, "Icing Scenario(See Table 4.227)"],
        [192, "Maximum Snow Albedo(%)"],
        [193, "Snow-Free Albedo(%)"],
        [194, "Slight risk convective outlook(categorical)"],
        [195, "Moderate risk convective outlook(categorical)"],
        [196, "High risk convective outlook(categorical)"],
        [197, "Tornado probability(%)"],
        [198, "Hail probability(%)"],
        [199, "Wind probability(%)"],
        [200, "Significant Tornado probability(%)"],
        [201, "Significant Hail probability(%)"],
        [202, "Significant Wind probability(%)"],
        [203, "Categorical Thunderstorm(Code table 4.222)"],
        [204, "Number of mixed layers next to surface(integer)"],
        [205, "Flight Category()"],
        [206, "Confidence - Ceiling()"],
        [207, "Confidence - Visibility()"],
        [208, "Confidence - Flight Category()"],
        [209, "Low-Level aviation interest()"],
        [210, "High-Level aviation interest()"],
        [211, "Visible, Black Sky Albedo(%)"],
        [212, "Visible, White Sky Albedo(%)"],
        [213, "Near IR, Black Sky Albedo(%)"],
        [214, "Near IR, White Sky Albedo(%)"],
        [215, "Total Probability of Severe Thunderstorms (Days 2,3)(%)"],
        [216, "Total Probability of Extreme Severe Thunderstorms (Days 2,3)(%)"],
        [217, "Supercooled Large Droplet (SLD) Icingsee Note 2(See Table 4.207)"],
        [218, "Radiative emissivity()"],
        [219, "Turbulence Potential Forecast Index()"],
        [220, "Categorical Severe Thunderstorm(Code table 4.222)"],
        [221, "Probability of Convection(%)"],
        [222, "Convection Potential(Code table 4.222)"],
        [232, "Volcanic Ash Forecast Transport and Dispersion(log10 (kg m-3))"],
        [233, "Icing probability(non-dim)"],
        [234, "Icing severity(non-dim)"],
        [255, "Missing"],
        [null, nf0(key)]
    ]);
};

exports.ParameterNumberByProductDisciplineAndParameterCategory_0_20 = function (obj) {
    var key = obj.ParameterNumberByProductDisciplineAndParameterCategory;
    obj.meta.ParameterNumberByProductDisciplineAndParameterCategory = echo(key, [
        [0, "Mass Density (Concentration)(kg m-3)"],
        [1, "Column-Integrated Mass Density (See Note 1)(kg m-2)"],
        [2, "Mass Mixing Ratio (Mass Fraction in Air)(kg kg-1)"],
        [3, ">Atmosphere Emission Mass Flux(kg m-2s-1)"],
        [4, "Atmosphere Net Production Mass Flux(kg m-2s-1)"],
        [5, ">Atmosphere Net Production And Emision Mass Flux(kg m-2s-1)"],
        [6, "Surface Dry Deposition Mass Flux(kg m-2s-1)"],
        [7, "Surface Wet Deposition Mass Flux(kg m-2s-1)"],
        [8, "Atmosphere Re-Emission Mass Flux(kg m-2s-1)"],
        [9, "Wet Deposition by Large-Scale Precipitation Mass Flux(kg m-2s-1)"],
        [10, "Wet Deposition by Convective Precipitation Mass Flux(kg m-2s-1)"],
        [11, "Sedimentation Mass Flux(kg m-2s-1)"],
        [12, "Dry Deposition Mass Flux(kg m-2s-1)"],
        [13, "Transfer From Hydrophobic to Hydrophilic(kg kg-1s-1)"],
        [14, "Transfer From SO2 (Sulphur Dioxide) to SO4 (Sulphate)(kg kg-1s-1)"],
        [50, "Amount in Atmosphere(mol)"],
        [51, "Concentration In Air(mol m-3)"],
        [52, "Volume Mixing Ratio (Fraction in Air)(mol mol-1)"],
        [53, "Chemical Gross Production Rate of Concentration(mol m-3s-1)"],
        [54, "Chemical Gross Destruction Rate of Concentration(mol m-3s-1)"],
        [55, "Surface Flux(mol m-2s-1)"],
        [56, "Changes Of Amount in Atmosphere (See Note 1)(mol s-1)"],
        [57, "Total Yearly Average Burden of The Atmosphere>(mol)"],
        [58, "Total Yearly Average Atmospheric Loss (See Note 1)(mol s-1)"],
        [59, "Aerosol Number Concentration(m-3)"],
        [100, "Surface Area Density (Aerosol)(m-1)"],
        [101, "Vertical Visual Range(m)"],
        [102, "Aerosol Optical Thickness(Numeric)"],
        [103, "Single Scattering Albedo(Numeric)"],
        [104, "Asymmetry Factor(Numeric)"],
        [105, "Aerosol Extinction Coefficient(m-1)"],
        [106, "Aerosol Absorption Coefficient(m-1)"],
        [107, "Aerosol Lidar Backscatter from Satellite(m-1sr-1)"],
        [108, "Aerosol Lidar Backscatter from the Ground(m-1sr-1)"],
        [109, "Aerosol Lidar Extinction from Satellite(m-1)"],
        [110, "Aerosol Lidar Extinction from the Ground(m-1)"],
        [255, "Missing"],
        [null, nf0(key)]
    ]);
};

exports.ParameterNumberByProductDisciplineAndParameterCategory_0_190 = function (obj) {
    var key = obj.ParameterNumberByProductDisciplineAndParameterCategory;
    obj.meta.ParameterNumberByProductDisciplineAndParameterCategory = echo(key, [
        [0, "Arbitrary Text String(CCITTIA5)"],

        [255, "Missing"],
        [null, nf0(key)]
    ]);
};

exports.ParameterNumberByProductDisciplineAndParameterCategory_0_191 = function (obj) {
    var key = obj.ParameterNumberByProductDisciplineAndParameterCategory;
    obj.meta.ParameterNumberByProductDisciplineAndParameterCategory = echo(key, [
        [0, "Seconds prior to initial reference time (defined in Section 1)(s)"],
        [1, "Geographical Latitude(N)"],
        [2, "Geographical Longitude(E)"],
        [192, "Latitude (-90 to 90)()"],
        [193, "East Longitude (0 to 360)()"],
        [194, "Seconds prior to initial reference time(s)"],
        [195, "Model Layer number (From bottom up)()"],
        [196, "Latitude (nearest neighbor) (-90 to 90)()"],
        [197, "East Longitude (nearest neighbor) (0 to 360)()"],
        [255, "Missing"],
        [null, nf0(key)]
    ]);
};

exports.ParameterNumberByProductDisciplineAndParameterCategory_0_192 = function (obj) {
    var key = obj.ParameterNumberByProductDisciplineAndParameterCategory;
    obj.meta.ParameterNumberByProductDisciplineAndParameterCategory = echo(key, [
        [1, "Covariance between zonal and meridional components of the wind. Defined as [uv]-[u][v], where [] indicates the mean over the indicated time span.(m2/s2)"],
        [2, "Covariance between zonal component of the wind and temperature. Defined as [uT]-[u][T], where [] indicates the mean over the indicated time span.(K*m/s)"],
        [3, "Covariance between meridional component of the wind and temperature. Defined as [vT]-[v][T], where [] indicates the mean over the indicated time span.(K*m/s)"],
        [4, "Covariance between temperature and vertical component of the wind. Defined as [wT]-[w][T], where [] indicates the mean over the indicated time span.(K*m/s)"],
        [5, "Covariance between zonal and zonal components of the wind. Defined as [uu]-[u][u], where [] indicates the mean over the indicated time span.(m2/s2)"],
        [6, "Covariance between meridional and meridional components of the wind. Defined as [vv]-[v][v], where [] indicates the mean over the indicated time span.(m2/s2)"],
        [7, "Covariance between specific humidity and zonal components of the wind. Defined as [uq]-[u][q], where [] indicates the mean over the indicated time span.(kg/kg*m/s)"],
        [8, "Covariance between specific humidity and meridional components of the wind. Defined as [vq]-[v][q], where [] indicates the mean over the indicated time span.(kg/kg*m/s)"],
        [9, "Covariance between temperature and vertical components of the wind. Defined as [T]-[][T], where [] indicates the mean over the indicated time span.(K*Pa/s)"],
        [10, "Covariance between specific humidity and vertical components of the wind. Defined as [q]-[][q], where [] indicates the mean over the indicated time span.(kg/kg*Pa/s)"],
        [11, "Covariance between surface pressure and surface pressure. Defined as [Psfc]-[Psfc][Psfc], where [] indicates the mean over the indicated time span.(Pa*Pa)"],
        [12, "Covariance between specific humidity and specific humidy. Defined as [qq]-[q][q], where [] indicates the mean over the indicated time span.(kg/kg*kg/kg)"],
        [13, "Covariance between vertical and vertical components of the wind. Defined as []-[][], where [] indicates the mean over the indicated time span.(Pa2/s2)"],
        [14, "Covariance between temperature and temperature. Defined as [TT]-[T][T], where [] indicates the mean over the indicated time span.(K*K)"],
        [255, "Missing"],
        [null, nf0(key)]
    ]);
};

exports.ParameterNumberByProductDisciplineAndParameterCategory_1_0 = function (obj) {
    var key = obj.ParameterNumberByProductDisciplineAndParameterCategory;
    obj.meta.ParameterNumberByProductDisciplineAndParameterCategory = echo(key, [
        [0, "Flash Flood Guidance (Encoded as an accumulation over a floating subinterval of time between the reference time and valid time)(kg m-2)"],
        [1, "Flash Flood Runoff (Encoded as an accumulation over a floating subinterval of time)(kg m-2)"],
        [2, "Remotely Sensed Snow Cover(See Table 4.215)"],
        [3, "Elevation of Snow Covered Terrain(See Table 4.216)"],
        [4, "Snow Water Equivalent Percent of Normal(%)"],
        [5, "Baseflow-Groundwater Runoff(kg m-2)"],
        [6, "Storm Surface Runoff(kg m-2)"],
        [192, "Baseflow-Groundwater Runoff(kg m-2)"],
        [193, "Storm Surface Runoff(kg m-2)"],
        [255, "Missing"],
        [null, nf0(key)]
    ]);
};

exports.ParameterNumberByProductDisciplineAndParameterCategory_1_1 = function (obj) {
    var key = obj.ParameterNumberByProductDisciplineAndParameterCategory;
    obj.meta.ParameterNumberByProductDisciplineAndParameterCategory = echo(key, [
        [0, "Conditional percent precipitation amount fractile for an overall period (encoded as an accumulation)(kg m-2)"],
        [1, "Percent Precipitation in a sub-period of an overall period (encoded as a percent accumulation over the sub-period)(%)"],
        [2, "Probability of 0.01 inch of precipitation (POP)(%)"],
        [192, "Probability of Freezing Precipitation(%)"],
        [193, "Probability of Frozen Precipitation(%)"],
        [194, "Probability of precipitation exceeding flash flood guidance values(%)"],
        [195, "Probability of Wetting Rain, exceeding in 0.10 in a given time period(%)"],
        [255, "Missing"],
        [null, nf0(key)]
    ]);
};

exports.ParameterNumberByProductDisciplineAndParameterCategory_1_2 = function (obj) {
    var key = obj.ParameterNumberByProductDisciplineAndParameterCategory;
    obj.meta.ParameterNumberByProductDisciplineAndParameterCategory = echo(key, [
        [0, "Water Depth(m)"],
        [1, "Water Temperature(K)"],
        [2, "Water Fraction(Proportion)"],
        [3, "Sediment Thickness(m)"],
        [4, "Sediment Temperature(K)"],
        [5, "Ice Thickness(m)"],
        [6, "Ice Temperature(K)"],
        [7, "Ice Cover(Proportion)"],
        [8, "Land Cover (0=water, 1=land)(Proportion)"],
        [9, "Shape Factor with Respect to Salinity Profile()"],
        [10, "Shape Factor with Respect to Temperature Profile in Thermocline()"],
        [11, "Attenuation Coefficient of Water with Respect to Solar Attenuation Coefficient of Water with Respect to Solar Radiation(m-1)"],
        [12, "Salinity(kg kg-1)"],
        [255, "Missing"],
        [null, nf0(key)]
    ]);
};

exports.ParameterNumberByProductDisciplineAndParameterCategory_2_0 = function (obj) {
    var key = obj.ParameterNumberByProductDisciplineAndParameterCategory;
    obj.meta.ParameterNumberByProductDisciplineAndParameterCategory = echo(key, [
        [0, "Land Cover (0=sea, 1=land)(Proportion)"],
        [1, "Surface Roughness(m)"],
        [2, "Soil Temperature ***(K)"],
        [3, "Soil Moisture Content*(kg m-2)"],
        [4, "Vegetation(%)"],
        [5, "Water Runoff(kg m-2)"],
        [6, "Evapotranspiration(kg-2 s-1)"],
        [7, "Model Terrain Height(m)"],
        [8, "Land Use(See Table 4.212)"],
        [9, "Volumetric Soil Moisture Content**(Proportion)"],
        [10, "Ground Heat Flux*(W m-2)"],
        [11, "Moisture Availability(%)"],
        [12, "Exchange Coefficient(kg m-2 s-1)"],
        [13, "Plant Canopy Surface Water(kg m-2)"],
        [14, "Blackadar's Mixing Length Scale(m)"],
        [15, "Canopy Conductance(m s-1)"],
        [16, "Minimal Stomatal Resistance(s m-1)"],
        [17, "Wilting Point*(Proportion)"],
        [18, "Solar parameter in canopy conductance(Proportion)"],
        [19, "Temperature parameter in canopy(Proportion)"],
        [20, "Humidity parameter in canopy conductance(Proportion)"],
        [21, "Soil moisture parameter in canopy conductance(Proportion)"],
        [22, "Soil Moisture ***(kg m-3)"],
        [23, "Column-Integrated Soil Water ***(kg m-2)"],
        [24, "Heat Flux(W m-2)"],
        [25, "Volumetric Soil Moisture(m3 m-3)"],
        [26, "Wilting Point(kg m-3)"],
        [27, "Volumetric Wilting Point(m3 m-3)"],
        [28, "Leaf Area Index(Numeric)"],
        [29, "Evergreen Forest(Numeric)"],
        [30, "Deciduous Forest(Numeric)"],
        [31, "Normalized Differential Vegetation Index (NDVI)(Numeric)"],
        [32, "Root Depth of Vegetation(m)"],
        [192, "Volumetric Soil Moisture Content(Fraction)"],
        [193, "Ground Heat Flux(W m-2)"],
        [194, "Moisture Availability(%)"],
        [195, "Exchange Coefficient((kg m-3) (m s-1))"],
        [196, "Plant Canopy Surface Water(kg m-2)"],
        [197, "Blackadars Mixing Length Scale(m)"],
        [198, "Vegetation Type(Integer (0-13))"],
        [199, "Canopy Conductance(m s-1)"],
        [200, "Minimal Stomatal Resistance(s m-1)"],
        [201, "Wilting Point(Fraction)"],
        [202, "Solar parameter in canopy conductance(Fraction)"],
        [203, "Temperature parameter in canopy conductance(Fraction)"],
        [204, "Humidity parameter in canopy conductance(Fraction)"],
        [205, "Soil moisture parameter in canopy conductance(Fraction)"],
        [206, "Rate of water dropping from canopy to ground()"],
        [207, "Ice-free water surface(%)"],
        [208, "Surface exchange coefficients for T and Q divided by delta z(m s-1)"],
        [209, "Surface exchange coefficients for U and V divided by delta z(m s-1)"],
        [210, "Vegetation canopy temperature(K)"],
        [211, "Surface water storage(Kg m-2)"],
        [212, "Liquid soil moisture content (non-frozen)(Kg m-2)"],
        [213, "Open water evaporation (standing water)(W m-2)"],
        [214, "Groundwater recharge(Kg m-2)"],
        [215, "Flood plain recharge(Kg m-2)"],
        [216, "Roughness length for heat(m)"],
        [217, "Normalized Difference Vegetation Index()"],
        [218, "Land-sea coverage (nearest neighbor) [land=1,sea=0]()"],
        [219, "Asymptotic mixing length scale(m)"],
        [220, "Water vapor added by precip assimilation(Kg m-2)"],
        [221, "Water condensate added by precip assimilation(Kg m-2)"],
        [222, "Water Vapor Flux Convergance (Vertical Int)(Kg m-2)"],
        [223, "Water Condensate Flux Convergance (Vertical Int)(Kg m-2)"],
        [224, "Water Vapor Zonal Flux (Vertical Int)(Kg m-2)"],
        [225, "Water Vapor Meridional Flux (Vertical Int)(Kg m-2)"],
        [226, "Water Condensate Zonal Flux (Vertical Int)(Kg m-2)"],
        [227, "Water Condensate Meridional Flux (Vertical Int)(Kg m-2)"],
        [228, "Aerodynamic conductance(m s-1)"],
        [229, "Canopy water evaporation(W m-2)"],
        [230, "Transpiration(W m-2)"],
        [255, "Missing"],
        [null, nf0(key)]
    ]);
};

exports.ParameterNumberByProductDisciplineAndParameterCategory_2_1 = function (obj) {
    var key = obj.ParameterNumberByProductDisciplineAndParameterCategory;
    obj.meta.ParameterNumberByProductDisciplineAndParameterCategory = echo(key, [
        [192, "Cold Advisory for Newborn Livestock()"],
        [255, "Missing"],
        [null, nf0(key)]
    ]);
};

exports.ParameterNumberByProductDisciplineAndParameterCategory_2_3 = function (obj) {
    var key = obj.ParameterNumberByProductDisciplineAndParameterCategory;
    obj.meta.ParameterNumberByProductDisciplineAndParameterCategory = echo(key, [
        [0, "Soil Type(See Table 4.213)"],
        [1, "Upper Layer Soil Temperature*(K)"],
        [2, "Upper Layer Soil Moisture*(kg m-3)"],
        [3, "Lower Layer Soil Moisture*(kg m-3)"],
        [4, "Bottom Layer Soil Temperature*(K)"],
        [5, "Liquid Volumetric Soil Moisture (non-frozen)**(Proportion)"],
        [6, "Number of Soil Layers in Root Zone(Numeric)"],
        [7, "Transpiration Stress-onset (soil moisture)**(Proportion)"],
        [8, "Direct Evaporation Cease (soil moisture)**(Proportion)"],
        [9, "Soil Porosity**(Proportion)"],
        [10, "Liquid Volumetric Soil Moisture (Non-Frozen)(m3 m-3)"],
        [11, "Volumetric Transpiration Stree-Onset(Soil Moisture)(m3 m-3)"],
        [12, "Transpiration Stree-Onset(Soil Moisture)(kg m-3)"],
        [13, "Volumetric Direct Evaporation Cease(Soil Moisture)(m3 m-3)"],
        [14, "Direct Evaporation Cease(Soil Moisture)(kg m-3)"],
        [15, "Soil Porosity(m3 m-3)"],
        [16, "Volumetric Saturation Of Soil Moisture(m3 m-3)"],
        [17, "Saturation Of Soil Moisture(kg m-3)"],
        [18, "Soil Temperature(K)"],
        [19, "Soil Moisture(kg m-3)"],
        [20, "Column-Integrated Soil Moisture(kg m-2)"],
        [21, "Soil Ice(kg m-3)"],
        [22, "Column-Integrated Soil Ice(kg m-2)"],
        [192, "Liquid Volumetric Soil Moisture (non Frozen)(Proportion)"],
        [193, "Number of Soil Layers in Root Zone(non-dim)"],
        [194, "Surface Slope Type(Index)"],
        [195, "Transpiration Stress-onset (soil moisture)(Proportion)"],
        [196, "Direct Evaporation Cease (soil moisture)(Proportion)"],
        [197, "Soil Porosity(Proportion)"],
        [198, "Direct Evaporation from Bare Soil(W m-2)"],
        [199, "Land Surface Precipitation Accumulation(kg m-2)"],
        [200, "Bare Soil Surface Skin temperature(K)"],
        [201, "Average Surface Skin Temperature(K)"],
        [202, "Effective Radiative Skin Temperature(K)"],
        [203, "Field Capacity(Fraction)"],
        [255, "Missing"],
        [null, nf0(key)]
    ]);
};

exports.ParameterNumberByProductDisciplineAndParameterCategory_2_4 = function (obj) {
    var key = obj.ParameterNumberByProductDisciplineAndParameterCategory;
    obj.meta.ParameterNumberByProductDisciplineAndParameterCategory = echo(key, [
        [0, "Fire Outlook(See Table 4.224)"],
        [1, "Fire Outlook Due to Dry Thunderstorm(See Table 4.224)"],
        [2, "Haines Index(Numeric)"],
        [3, "Fire Burned Area(%)"],
        [255, "Missing"],
        [null, nf0(key)]
    ]);
};

exports.ParameterNumberByProductDisciplineAndParameterCategory_3_0 = function (obj) {
    var key = obj.ParameterNumberByProductDisciplineAndParameterCategory;
    obj.meta.ParameterNumberByProductDisciplineAndParameterCategory = echo(key, [
        [0, "Scaled Radiance(Numeric)"],
        [1, "Scaled Albedo(Numeric)"],
        [2, "Scaled Brightness Temperature(Numeric)"],
        [3, "Scaled Precipitable Water(Numeric)"],
        [4, "Scaled Lifted Index(Numeric)"],
        [5, "Scaled Cloud Top Pressure(Numeric)"],
        [6, "Scaled Skin Temperature(Numeric)"],
        [7, "Cloud Mask(See Table 4.217)"],
        [8, "Pixel scene type(See Table 4.218)"],
        [9, "Fire Detection Indicator(See Table 4.223)"],
        [255, "Missing"],
        [null, nf0(key)]
    ]);
};

exports.ParameterNumberByProductDisciplineAndParameterCategory_3_1 = function (obj) {
    var key = obj.ParameterNumberByProductDisciplineAndParameterCategory;
    obj.meta.ParameterNumberByProductDisciplineAndParameterCategory = echo(key, [
        [0, "Estimated Precipitation(kg m-2)"],
        [1, "Instantaneous Rain Rate(kg m-2 s-1)"],
        [2, "Cloud Top Height(m)"],
        [3, "Cloud Top Height Quality Indicator(Code table 4.219)"],
        [4, "Estimated u-Component of Wind(m s-1)"],
        [5, "Estimated v-Component of Wind(m s-1)"],
        [6, "Number Of Pixels Used(Numeric)"],
        [7, "Solar Zenith Angle()"],
        [8, "Relative Azimuth Angle()"],
        [9, "Reflectance in 0.6 Micron Channel(%)"],
        [10, "Reflectance in 0.8 Micron Channel(%)"],
        [11, "Reflectance in 1.6 Micron Channel(%)"],
        [12, "Reflectance in 3.9 Micron Channel(%)"],
        [13, "Atmospheric Divergence(s-1)"],
        [14, "Cloudy Brightness Temperature(K)"],
        [15, "Clear Sky Brightness Temperature(K)"],
        [16, "Cloudy Radiance (with respect to wave number)(W m-1 sr-1)"],
        [17, "Clear Sky Radiance (with respect to wave number)(W m-1 sr-1)"],
        [19, "Wind Speed(m s-1)"],
        [20, "Aerosol Optical Thickness at 0.635 m()"],
        [21, "Aerosol Optical Thickness at 0.810 m()"],
        [22, "Aerosol Optical Thickness at 1.640 m()"],
        [23, "Angstrom Coefficient()"],
        [192, "Scatterometer Estimated U Wind Component(m s-1)"],
        [193, "Scatterometer Estimated V Wind Component(m s-1)"],
        [255, "Missing"],
        [null, nf0(key)]
    ]);
};

exports.ParameterNumberByProductDisciplineAndParameterCategory_3_192 = function (obj) {
    var key = obj.ParameterNumberByProductDisciplineAndParameterCategory;
    obj.meta.ParameterNumberByProductDisciplineAndParameterCategory = echo(key, [
        [0, "Simulated Brightness Temperature for GOES 12, Channel 2(K)"],
        [1, "Simulated Brightness Temperature for GOES 12, Channel 3(K)"],
        [2, "Simulated Brightness Temperature for GOES 12, Channel 4(K)"],
        [3, "Simulated Brightness Temperature for GOES 12, Channel 6(K)"],
        [4, "Simulated Brightness Counts for GOES 12, Channel 3(Byte)"],
        [5, "Simulated Brightness Counts for GOES 12, Channel 4(Byte)"],
        [6, "Simulated Brightness Temperature for GOES 11, Channel 2(K)"],
        [7, "Simulated Brightness Temperature for GOES 11, Channel 3(K)"],
        [8, "Simulated Brightness Temperature for GOES 11, Channel 4(K)"],
        [9, "Simulated Brightness Temperature for GOES 11, Channel 5(K)"],
        [10, "Simulated Brightness Temperature for AMSRE on Aqua, Channel 9(K)"],
        [11, "Simulated Brightness Temperature for AMSRE on Aqua, Channel 10(K)"],
        [12, "Simulated Brightness Temperature for AMSRE on Aqua, Channel 11(K)"],
        [13, "Simulated Brightness Temperature for AMSRE on Aqua, Channel 12(K)"],
        [255, "Missing"],
        [null, nf0(key)]
    ]);
};

exports.ParameterNumberByProductDisciplineAndParameterCategory_4_0 = function (obj) {
    var key = obj.ParameterNumberByProductDisciplineAndParameterCategory;
    obj.meta.ParameterNumberByProductDisciplineAndParameterCategory = echo(key, [
        [0, "Temperature(K)"],
        [1, "Electron Temperature(K)"],
        [2, "Proton Temperature(K)"],
        [3, "Ion Temperature(K)"],
        [4, "Parallel Temperature(K)"],
        [5, "Perpendicular Temperature(K)"],
        [255, "Missing"],
        [null, nf0(key)]
    ]);
};

exports.ParameterNumberByProductDisciplineAndParameterCategory_4_1 = function (obj) {
    var key = obj.ParameterNumberByProductDisciplineAndParameterCategory;
    obj.meta.ParameterNumberByProductDisciplineAndParameterCategory = echo(key, [
        [0, "Velocity Magnitude (Speed)(m s-1)"],
        [1, "1st Vector Component of Velocity (Coordinate system dependent)(m s-1)"],
        [2, "2nd Vector Component of Velocity (Coordinate system dependent)(m s-1)"],
        [3, "3rd Vector Component of Velocity (Coordinate system dependent)(m s-1)"],
        [255, "Missing"],
        [null, nf0(key)]
    ]);
};

exports.ParameterNumberByProductDisciplineAndParameterCategory_4_2 = function (obj) {
    var key = obj.ParameterNumberByProductDisciplineAndParameterCategory;
    obj.meta.ParameterNumberByProductDisciplineAndParameterCategory = echo(key, [
        [0, "Particle Number Density(m-3)"],
        [1, "Electron Density(m-3)"],
        [2, "Proton Density(m-3)"],
        [3, "Ion Density(m-3)"],
        [4, "Vertical Electron Content(m-2)"],
        [5, "HF Absorption Frequency(Hz)"],
        [6, "HF Absorption(dB)"],
        [7, "Spread F(m)"],
        [8, "h'F(m)"],
        [9, "Critical Frequency(Hz)"],
        [10, "Scintillation(Numeric)"],
        [255, "Missing"],
        [null, nf0(key)]
    ]);
};

exports.ParameterNumberByProductDisciplineAndParameterCategory_4_3 = function (obj) {
    var key = obj.ParameterNumberByProductDisciplineAndParameterCategory;
    obj.meta.ParameterNumberByProductDisciplineAndParameterCategory = echo(key, [
        [0, "Magnetic Field Magnitude(T)"],
        [1, "1st Vector Component of Magnetic Field(T)"],
        [2, "2nd Vector Component of Magnetic Field(T)"],
        [3, "3rd Vector Component of Magnetic Field(T)"],
        [4, "Electric Field Magnitude(V m-1)"],
        [5, "1st Vector Component of Electric Field(V m-1)"],
        [6, "2nd Vector Component of Electric Field(V m-1)"],
        [7, "3rd Vector Component of Electric Field(V m-1)"],
        [255, "Missing"],
        [null, nf0(key)]
    ]);
};

exports.ParameterNumberByProductDisciplineAndParameterCategory_4_4 = function (obj) {
    var key = obj.ParameterNumberByProductDisciplineAndParameterCategory;
    obj.meta.ParameterNumberByProductDisciplineAndParameterCategory = echo(key, [
        [0, "Proton Flux (Differential)((m2 s sr eV)-1)"],
        [1, "Proton Flux (Integral)((m2 s sr)-1)"],
        [2, "Electron Flux (Differential)((m2 s sr eV)-1)"],
        [3, "Electron Flux (Integral)((m2 s sr)-1)"],
        [4, "Heavy Ion Flux (Differential)((m2 s sr eV / nuc)-1)"],
        [5, "Heavy Ion Flux (iIntegral)((m2 s sr)-1)"],
        [6, "Cosmic Ray Neutron Flux(h-1)"],
        [255, "Missing"],
        [null, nf0(key)]
    ]);
};

exports.ParameterNumberByProductDisciplineAndParameterCategory_4_5 = function (obj) {
    var key = obj.ParameterNumberByProductDisciplineAndParameterCategory;
    obj.meta.ParameterNumberByProductDisciplineAndParameterCategory = echo(key, [
        [255, "Missing"],
        [null, nf0(key)]
    ]);
};

exports.ParameterNumberByProductDisciplineAndParameterCategory_4_6 = function (obj) {
    var key = obj.ParameterNumberByProductDisciplineAndParameterCategory;
    obj.meta.ParameterNumberByProductDisciplineAndParameterCategory = echo(key, [
        [0, "Integrated Solar Irradiance(W m-2)"],
        [1, "Solar X-ray Flux (XRS Long)(W m-2)"],
        [2, "Solar X-ray Flux (XRS Short)(W m-2)"],
        [3, "Solar EUV Irradiance(W m-2)"],
        [4, "Solar Spectral Irradiance(W m-2 nm-1)"],
        [5, "F10.7(W m-2 Hz-1)"],
        [6, "Solar Radio Emissions(W m-2 Hz-1)"],
        [255, "Missing"],
        [null, nf0(key)]
    ]);
};

exports.ParameterNumberByProductDisciplineAndParameterCategory_4_7 = function (obj) {
    var key = obj.ParameterNumberByProductDisciplineAndParameterCategory;
    obj.meta.ParameterNumberByProductDisciplineAndParameterCategory = echo(key, [
        [0, "Limb Intensity(m-2 s-1)"],
        [1, "Disk Intensity(m-2 s-1)"],
        [2, "Disk Intensity Day(m-2 s-1)"],
        [3, "Disk Intensity Night(m-2 s-1)"],
        [255, "Missing"],
        [null, nf0(key)]
    ]);
};

exports.ParameterNumberByProductDisciplineAndParameterCategory_4_8 = function (obj) {
    var key = obj.ParameterNumberByProductDisciplineAndParameterCategory;
    obj.meta.ParameterNumberByProductDisciplineAndParameterCategory = echo(key, [
        [0, "X-Ray Radiance(W sr-1 m-2)"],
        [1, "EUV Radiance(W sr-1 m-2)"],
        [2, "H-Alpha Radiance(W sr-1 m-2)"],
        [3, "White Light Radiance(W sr-1 m-2)"],
        [4, "CaII-K Radiance(W sr-1 m-2)"],
        [5, "White Light Coronagraph Radiance(W sr-1 m-2)"],
        [6, "Heliospheric Radiance(W sr-1 m-2)"],
        [7, "Thematic Mask(Numeric)"],
        [255, "Missing"],
        [null, nf0(key)]
    ]);
};

exports.ParameterNumberByProductDisciplineAndParameterCategory_4_9 = function (obj) {
    var key = obj.ParameterNumberByProductDisciplineAndParameterCategory;
    obj.meta.ParameterNumberByProductDisciplineAndParameterCategory = echo(key, [
        [0, "Pedersen Conductivity(S m-1)"],
        [1, "Hall Conductivity(S m-1)"],
        [2, "Parallel Conductivity(S m-1)"],
        [255, "Missing"],
        [null, nf0(key)]
    ]);
};

exports.ParameterNumberByProductDisciplineAndParameterCategory_10_0 = function (obj) {
    var key = obj.ParameterNumberByProductDisciplineAndParameterCategory;
    obj.meta.ParameterNumberByProductDisciplineAndParameterCategory = echo(key, [
        [0, "Wave Spectra (1)(-)"],
        [1, "Wave Spectra (2)(-)"],
        [2, "Wave Spectra (3)(-)"],
        [3, "Significant Height of Combined Wind Waves and Swell(m)"],
        [4, "Direction of Wind Waves(degree true)"],
        [5, "Significant Height of Wind Waves(m)"],
        [6, "Mean Period of Wind Waves(s)"],
        [7, "Direction of Swell Waves(degree true)"],
        [8, "Significant Height of Swell Waves(m)"],
        [9, "Mean Period of Swell Waves(s)"],
        [10, "Primary Wave Direction(degree true)"],
        [11, "Primary Wave Mean Period(s)"],
        [12, "Secondary Wave Direction(degree true)"],
        [13, "Secondary Wave Mean Period(s)"],
        [14, "Direction of Combined Wind Waves and Swell(degree true)"],
        [15, "Mean Period of Combined Wind Waves and Swell(s)"],
        [16, "Coefficient of Drag With Waves(-)"],
        [17, "Friction Velocity(m s-1)"],
        [18, "Wave Stress(N m-2)"],
        [19, "Normalised Waves Stress(-)"],
        [20, "Mean Square Slope of Waves(-)"],
        [21, "U-component Surface Stokes Drift(m s-1)"],
        [22, "V-component Surface Stokes Drift(m s-1)"],
        [23, "Period of Maximum Individual Wave Height(s)"],
        [24, "Maximum Individual Wave Height(m)"],
        [25, "Inverse Mean Wave Frequency(s)"],
        [26, "Inverse Mean Frequency of The Wind Waves(s)"],
        [27, "Inverse Mean Frequency of The Total Swell(s)"],
        [28, "Mean Zero-Crossing Wave Period(s)"],
        [29, "Mean Zero-Crossing Period of The Wind Waves(s)"],
        [30, "Mean Zero-Crossing Period of The Total Swell(s)"],
        [31, "Wave Directional Width(-)"],
        [32, "Directional Width of The Wind Waves(-)"],
        [33, "Directional Width of The Total Swell(-)"],
        [34, "Peak Wave Period(s)"],
        [35, "Peak Period of The Wind Waves(s)"],
        [36, "Peak Period of The Total Swell(s)"],
        [37, "Altimeter Wave Height(m)"],
        [38, "Altimeter Corrected Wave Height(m)"],
        [39, "Altimeter Range Relative Correction(-)"],
        [40, "10 Metre Neutral Wind Speed Over Waves(m s-1)"],
        [41, "10 Metre Wind Direction Over Waves(degree true)"],
        [42, "Wave Engery Spectrum(m-2 s rad-1)"],
        [43, "Kurtosis of The Sea Surface Elevation Due to Waves(-)"],
        [45, "Spectral Peakedness Factor(s-1)"],
        [192, "Wave Steepness(proportion)"],
        [255, "Missing"],
        [null, nf0(key)]
    ]);
};

exports.ParameterNumberByProductDisciplineAndParameterCategory_10_1 = function (obj) {
    var key = obj.ParameterNumberByProductDisciplineAndParameterCategory;
    obj.meta.ParameterNumberByProductDisciplineAndParameterCategory = echo(key, [
        [0, "Current Direction(degree True)"],
        [1, "Current Speed(m s-1)"],
        [2, "U-Component of Current(m s-1)"],
        [3, "V-Component of Current(m s-1)"],
        [192, "Ocean Mixed Layer U Velocity(m s-1)"],
        [193, "Ocean Mixed Layer V Velocity(m s-1)"],
        [194, "Barotropic U velocity(m s-1)"],
        [195, "Barotropic V velocity(m s-1)"],
        [255, "Missing"],
        [null, nf0(key)]
    ]);
};

exports.ParameterNumberByProductDisciplineAndParameterCategory_10_2 = function (obj) {
    var key = obj.ParameterNumberByProductDisciplineAndParameterCategory;
    obj.meta.ParameterNumberByProductDisciplineAndParameterCategory = echo(key, [
        [0, "Ice Cover(Proportion)"],
        [1, "Ice Thickness(m)"],
        [2, "Direction of Ice Drift(degree True)"],
        [3, "Speed of Ice Drift(m s-1)"],
        [4, "U-Component of Ice Drift(m s-1)"],
        [5, "V-Component of Ice Drift(m s-1)"],
        [6, "Ice Growth Rate(m s-1)"],
        [7, "Ice Divergence(s-1)"],
        [8, "Ice Temperature(K)"],
        [9, "Ice Internal Pressure(Pa m)"],
        [255, "Missing"],
        [null, nf0(key)]
    ]);
};

exports.ParameterNumberByProductDisciplineAndParameterCategory_10_3 = function (obj) {
    var key = obj.ParameterNumberByProductDisciplineAndParameterCategory;
    obj.meta.ParameterNumberByProductDisciplineAndParameterCategory = echo(key, [
        [0, "Water Temperature(K)"],
        [1, "Deviation of Sea Level from Mean(m)"],
        [192, "Hurricane Storm Surge(m)"],
        [193, "Extra Tropical Storm Surge(m)"],
        [194, "Ocean Surface Elevation Relative to Geoid(m)"],
        [195, "Sea Surface Height Relative to Geoid(m)"],
        [196, "Ocean Mixed Layer Potential Density (Reference 2000m)(kg m-3)"],
        [197, "Net Air-Ocean Heat Flux(W m-2)"],
        [198, "Assimilative Heat Flux(W m-2)"],
        [199, "Surface Temperature Trend(degree per day)"],
        [200, "Surface Salinity Trend(psu per day)"],
        [201, "Kinetic Energy(J kg-1)"],
        [202, "Salt Flux(kg m-2s-1)"],
        [242, "20% Tropical Cyclone Storm Surge Exceedance(m)"],
        [243, "30% Tropical Cyclone Storm Surge Exceedance(m)"],
        [244, "40% Tropical Cyclone Storm Surge Exceedance(m)"],
        [245, "50% Tropical Cyclone Storm Surge Exceedance(m)"],
        [246, "60% Tropical Cyclone Storm Surge Exceedance(m)"],
        [247, "70% Tropical Cyclone Storm Surge Exceedance(m)"],
        [248, "80% Tropical Cyclone Storm Surge Exceedance(m)"],
        [249, "90% Tropical Cyclone Storm Surge Exceedance(m)"],
        [250, "Extra Tropical Storm Surge Combined Surge and Tide(m)"],
        [255, "Missing"],
        [null, nf0(key)]
    ]);
};

exports.ParameterNumberByProductDisciplineAndParameterCategory_10_4 = function (obj) {
    var key = obj.ParameterNumberByProductDisciplineAndParameterCategory;
    obj.meta.ParameterNumberByProductDisciplineAndParameterCategory = echo(key, [
        [0, "Main Thermocline Depth(m)"],
        [1, "Main Thermocline Anomaly(m)"],
        [2, "Transient Thermocline Depth(m)"],
        [3, "Salinity(kg kg-1)"],
        [4, "Ocean Vertical Heat Diffusivity(m2 s-1)"],
        [5, "Ocean Vertical Salt Diffusivity(m2 s-1)"],
        [6, "Ocean Vertical Momentum Diffusivity(m2 s-1)"],
        [7, "Bathymetry(m)"],
        [11, "Shape Factor With Respect To Salinity Profile()"],
        [12, "Shape Factor With Respect To Temperature Profile In Thermocline()"],
        [13, "Attenuation Coefficient Of Water With Respect to Solar Radiation(m-1)"],
        [14, "Water Depth(m)"],
        [15, "Water Temperature(K)"],
        [192, "3-D Temperature(c)"],
        [193, "3-D Salinity(psu)"],
        [194, "Barotropic Kinectic Energy(J kg-1)"],
        [195, "Geometric Depth Below Sea Surface(m)"],
        [196, "Interface Depths(m)"],
        [197, "Ocean Heat Content(J m-2)"],
        [255, "Missing"],
        [null, nf0(key)]
    ]);
};

exports.ParameterNumberByProductDisciplineAndParameterCategory_10_191 = function (obj) {
    var key = obj.ParameterNumberByProductDisciplineAndParameterCategory;
    obj.meta.ParameterNumberByProductDisciplineAndParameterCategory = echo(key, [
        [0, "Seconds Prior To Initial Reference Time (Defined In Section 1)(s)"],
        [1, "Meridional Overturning Stream Function(m3 s-1)"],
        [255, "Missing"],
        [null, nf0(key)]
    ]);
};

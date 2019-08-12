// adapt GRIB2CLASS from grib2_solarchvision processing/java to JavaScript

"use strict";

var nf0 = require("./nf0");
var info = require("./info");
var logger = require("./logger");

var println = logger.println;
var printst = logger.printst;
var cout = logger.cout;

var rEarthKm = 6367.470;

function /* int */ uNumX2 (/* int */ m2, /* int */ m1) {
    return ((m2 << 8) + m1);
}

function /* int */ sNumX2 (/* int */ m2, /* int */ m1) {
    var /* long */ v = 0;

    if (m2 < 128) {
        v = (m2 << 8) + m1;
    } else {
        m2 -= 128;
        v = (m2 << 8) + m1;
        v *= -1;
    }

    return /* (int) */ v;
}

function /* int */ uNumX4 (/* int */ m4, /* int */ m3, /* int */ m2, /* int */ m1) {
    return ((m4 << 24) + (m3 << 16) + (m2 << 8) + m1);
}

function /* int */ sNumX4 (/* int */ m4, /* int */ m3, /* int */m2, /* int */ m1) {
    var /* long */ v = 0;

    if (m4 < 128) {
        v = ((m4 << 24) + (m3 << 16) + (m2 << 8) + m1);
    } else {
        m4 -= 128;
        v = ((m4 << 24) + (m3 << 16) + (m2 << 8) + m1);
        v *= -1;
    }

    return /* (int) */ v;
}

function /* long */ uNumX8 (/* int */ m8, /* int */ m7, /* int */ m6, /* int */ m5, /* int */ m4, /* int */ m3, /* int */ m2, /* int */ m1) {
    return (m8 << 56) + (m7 << 48) + (m6 << 40) + (m5 << 32) + (m4 << 24) + (m3 << 16) + (m2 << 8) + m1;
}

function /* int */ uNumXI (/* int[] */ m) { // note: follows reverse rule as this: int m[0], int m[1], int m[2] ...
    // println(m);

    var /* long */ v = 0;

    var len = m.length;
    for (var i = 0; i < len; i++) {
        v += m[i] << (len - 1 - i);
    }

    // println(v);

    return /* (int) */ v;
}

function /* int */ sNumXI (/* int[] */ m) { // note: follows reverse rule as this: int m[0], int m[1], int m[2] ...
    // println(m);

    var /* long */ v = 0;
    var vSign = 1;

    if (m[0] < 1) {
        v += m[0] << (m.length - 1);
    } else {
        v += (m[0] - 1) << (m.length - 1);
        vSign = -1;
    }

    for (var i = 1; i < m.length; i++) {
        v += m[i] << (m.length - 1 - i);
    }

    v *= vSign;

    // println(v);

    return /* (int) */ v;
}

function /* int */ getNthBit (/* Byte */ valByte, /* int */ posBit) {
    var valInt = valByte >> (8 - (posBit + 1)) & 0x0001;

    return /* (int) */ valInt;
}


function hex (byte) {
    return Buffer.from([byte]).toString("hex").toUpperCase();
}

function binary (uint, n) {
    var s = uint.toString(2);
    var len = s.length;
    var zeros = "";
    for (var i = 0; i < n - len; i++) {
        zeros += "0";
    }

    return (zeros + s).substring(0, n);
}

function /* String */ integerToBinaryString (/* int */ n) {
    return n.toString(2);
}

function /* String */ IntToBinary32 (/* int */ n) {
    var i;
    var s1 = integerToBinaryString(n);
    var len = s1.length;

    var s2 = "";
    for (i = 0; i < 32 - len; i++) {
        s2 += "0";
    }
    for (i = 0; i < len; i++) {
        s2 += s1.substring(i, i + 1);
    }

    return s2;
}

function /* float */ IEEE32 (/* String */ s) {
    var /* float */ vSign = Math.pow(-1, parseInt(s.substring(0, 1), 2));
    //println("v_sign", v_sign);

    var /* float */ vExponent = parseInt(s.substring(1, 9), 2) - 127;
    //println("v_exponent", v_exponent);

    var /* float */ vFraction = 0;
    for (var i = 0; i < 23; i++) {
        var q = parseInt(s.substring(9 + i, 10 + i), 2);
        vFraction += q * Math.pow(2, -(i + 1));
    }
    vFraction += 1;
    //println("v_fraction", v_fraction);

    return vSign * vFraction * Math.pow(2, vExponent);
}

module.exports = function /* class */ GRIB2CLASS (options) {
    logger.disable(!options.log);
    var numMembers = options.numMembers || 1;

    var lThis = this;

    this.meta = {};

    this.ParameterNameAndUnit = null;
    this.DataTitles = [];
    this.DataValues = null;
    this.DataAllocated = false;

    this.DisciplineOfProcessedData = 0;
    this.LengthOfMessage = 0;
    this.IdentificationOfCentre = 0;
    this.IdentificationOfSubCentre = 0;
    this.MasterTablesVersionNumber = 0;
    this.LocalTablesVersionNumber = 0;
    this.SignificanceOfReferenceTime = 0;
    this.Year = null;
    this.Month = null;
    this.Day = null;
    this.Hour = null;
    this.Minute = null;
    this.Second = null;
    this.ProductionStatusOfData = 0;
    this.TypeOfData = 0;

    this.TypeOfProjection = 0;

    this.Np = 0;
    this.Nx = 0;
    this.Ny = 0;

    this.ResolutionAndComponentFlags = 0;

    this.La1 = -90;
    this.Lo1 = -180;
    this.La2 = 90;
    this.Lo2 = 180;

    this.LaD = 0;
    this.LoV = 0;
    this.Dx = 1;
    this.Dy = 1;

    this.FirstLatIn = 0;
    this.SecondLatIn = 0;
    this.SouthLat = 0;
    this.SouthLon = 0;
    this.Rotation = 0;

    this.PCF = 0;

    this.ScanX = 0;
    this.ScanY = 0;

    this.Flag_BitNumbers = "00000000";
    this.ScanningMode = 0;
    this.Mode_BitNumbers = "00000000";

    this.NumberOfCoordinateValuesAfterTemplate = 0;
    this.ProductDefinitionTemplateNumber = 0;
    this.CategoryOfParametersByProductDiscipline = 0;
    this.ParameterNumberByProductDisciplineAndParameterCategory = 0;
    this.IndicatorOfUnitOfTimeRange = 0;
    this.ForecastTimeInDefinedUnits = 0;

    this.ForecastConvertedTime = null;

    this.TypeOfFirstFixedSurface = 0;
    this.NumberOfDataPoints = 0;
    this.DataRepresentationTemplateNumber = 0;

    this.ReferenceValue = null;
    this.BinaryScaleFactor = null;
    this.DecimalScaleFactor = null;
    this.NumberOfBitsUsedForEachPackedValue = null;

    this.NullBitmapFlags = null;

    this.fileBytes = [];
    var /* int */ nPointer;

    this.printMore = function (/* int */ startN, /* int */ displayMORE) {
        var i;

        for (i = 0; i < displayMORE; i++) {
            cout(this.fileBytes[startN + i]);
        }
        println();

        for (i = 0; i < displayMORE; i++) {
            printst("(" + hex(this.fileBytes[startN + i], 2) + ")");
        }
        println();

        for (i = 0; i < displayMORE; i++) {
            printst("[" + this.fileBytes[startN + i] + "]");
        }
        println();
    };

    this.getGrib2Section = function (/* int */ SectionNumber) {
        println("-----------------------------");

        printst("Section:\t");
        println(SectionNumber);

        var /* int */ nFirstBytes = 6;
        if (SectionNumber === 8) nFirstBytes = 4;

        var /* int[] */ SectionNumbers = new Int32Array(nFirstBytes);
        SectionNumbers[0] = 0;

        for (var j = 1; j < nFirstBytes; j += 1) {
            var c = this.fileBytes[nPointer + j];
            if (c < 0) c += 256;

            SectionNumbers[j] = c;

            cout(c);
        }
        println();

        var /* int */ lengthOfSection = -1;
        if (SectionNumber === 0) lengthOfSection = 16;
        else if (SectionNumber === 8) lengthOfSection = 4;
        else lengthOfSection = uNumX4(SectionNumbers[1], SectionNumbers[2], SectionNumbers[3], SectionNumbers[4]);

        var /* int */ newSectionNumber = -1;
        if (SectionNumber === 0) newSectionNumber = 0;
        else if (SectionNumber === 8) newSectionNumber = 8;
        else newSectionNumber = SectionNumbers[5];

        if (newSectionNumber === SectionNumber) {
            SectionNumbers = new Int32Array(1 + lengthOfSection);
            SectionNumbers[0] = 0;

            for (var j = 1; j <= lengthOfSection; j += 1) {
                var /* int */ c = this.fileBytes[nPointer + j];
                if (c < 0) c += 256;

                SectionNumbers[j] = c;

                //cout(c);
            }
            //println();
        } else {
            println();
            println("Not available section", SectionNumber);

            lengthOfSection = 0;

            SectionNumbers = new Int32Array(1);
            SectionNumbers[0] = 0;
        }

        for (var j = 1; j < SectionNumbers.length; j += 1) {
            //printst("(" + SectionNumbers[j] +  ")");
            //printst("(" + hex(SectionNumbers[j], 2) +  ")");
        }
        //println();

        printst("Length of section:\t");
        println(lengthOfSection);

        nPointer += lengthOfSection;

        return SectionNumbers;
    };

    this.readGrib2Members = function (/* int */ numberOfMembers) {
        var /* const int */ gridDefNumberOfDataPoints = 7;
        var /* const int */ gridDefNumberOfPointsAlongTheXaxis = 31;
        var /* const int */ gridDefNumberOfPointsAlongTheYaxis = 35;

        var /* const int */ gridDefLatLonLatitudeOfFirstGridPoint = 47;
        var /* const int */ gridDefLatLonLongitudeOfFirstGridPoint = 51;
        var /* const int */ gridDefLatLonResolutionAndComponentFlags = 55;
        var /* const int */ gridDefLatLonLatitudeOfLastGridPoint = 56;
        var /* const int */ gridDefLatLonLongitudeOfLastGridPoint = 60;
        // for Rotated latitude/longitude :
        var /* const int */ gridDefLatLonSouthPoleLatitude = 73;
        var /* const int */ gridDefLatLonSouthPoleLongitude = 77;
        var /* const int */ gridDefLatLonRotationOfProjection = 81;

        var /* const int */ gridDefPolarLatitudeOfFirstGridPoint = 39;
        var /* const int */ gridDefPolarLongitudeOfFirstGridPoint = 43;
        var /* const int */ gridDefPolarResolutionAndComponentFlags = 47;
        var /* const int */ gridDefPolarDeclinationOfTheGrid = 48;
        var /* const int */ gridDefPolarOrientationOfTheGrid = 52;
        var /* const int */ gridDefPolarXDirectionGridLength = 56;
        var /* const int */ gridDefPolarYDirectionGridLength = 60;
        var /* const int */ gridDefPolarProjectionCenterFlag = 64;

        var /* const int */ gridDefLambertLatitudeOfFirstGridPoint = 39;
        var /* const int */ gridDefLambertLongitudeOfFirstGridPoint = 43;
        var /* const int */ gridDefLambertResolutionAndComponentFlags = 47;
        var /* const int */ gridDefLambertDeclinationOfTheGrid = 48;
        var /* const int */ gridDefLambertOrientationOfTheGrid = 52;
        var /* const int */ gridDefLambertXDirectionGridLength = 56;
        var /* const int */ gridDefLambertYDirectionGridLength = 60;
        var /* const int */ gridDefLambertProjectionCenterFlag = 64;
        var /* const int */ gridDefLambert1stLatitudeIn = 66;
        var /* const int */ gridDefLambert2ndLatitudeIn = 70;
        var /* const int */ gridDefLambertSouthPoleLatitude = 74;
        var /* const int */ gridDefLambertSouthPoleLongitude = 78;

        var /* int */ gridDefScanningMode = 72;

        var /* int */ ComplexPackingGroupSplittingMethodUsed = 0;
        var /* int */ ComplexPackingMissingValueManagementUsed = 0;
        var /* float */ ComplexPackingPrimaryMissingValueSubstitute = 0.0;
        var /* float */ ComplexPackingSecondaryMissingValueSubstitute = 0.0;
        var /* int */ ComplexPackingNumberOfGroupsOfDataValues = 0;
        var /* int */ ComplexPackingReferenceForGroupWidths = 0;
        var /* int */ ComplexPackingNumberOfBitsUsedForGroupWidths = 0;
        var /* int */ ComplexPackingReferenceForGroupLengths = 0;
        var /* int */ ComplexPackingLengthIncrementForTheGroupLengths = 0;
        var /* int */ ComplexPackingTrueLengthOfLastGroup = 0;
        var /* int */ ComplexPackingNumberOfBitsUsedForTheScaledGroupLengths = 0;
        var /* int */ ComplexPackingOrderOfSpatialDifferencing = 0;
        var /* int */ ComplexPackingNumberOfExtraOctetsRequiredInDataSection = 0;

        this.Bitmap_Indicator = 0;
        var /* int */ BitmapBeginPointer = 0;
        var /* int */ BitmapEndPointer = 0;

        var /* int */ jpeg2000TypeOfOriginalFieldValues = 0;
        var /* int */ jpeg2000TypeOfCompression = 0;
        var /* int */ jpeg2000TargetCompressionRatio = 0;
        var /* int */ jpeg2000Lsiz = 0;
        var /* int */ jpeg2000Rsiz = 0;
        var /* int */ jpeg2000Xsiz = 0;
        var /* int */ jpeg2000Ysiz = 0;
        var /* int */ jpeg2000XOsiz = 0;
        var /* int */ jpeg2000YOsiz = 0;
        var /* int */ jpeg2000XTsiz = 0;
        var /* int */ jpeg2000YTsiz = 0;
        var /* int */ jpeg2000XTOsiz = 0;
        var /* int */ jpeg2000YTOsiz = 0;
        var /* int */ jpeg2000Csiz = 0;
        var /* int */ jpeg2000Ssiz = 0;
        var /* int */ jpeg2000XRsiz = 0;
        var /* int */ jpeg2000YRsiz = 0;
        var /* int */ jpeg2000Lcom = 0;
        var /* int */ jpeg2000Rcom = 0;
        var /* int */ jpeg2000Lcod = 0;
        var /* int */ jpeg2000Scod = 0;
        var /* int */ jpeg2000SGcodProgressionOrder = 0;
        var /* int */ jpeg2000SGcodNumberOfLayers = 0;
        var /* int */ jpeg2000SGcodMultipleComponentTransformation = 0;
        var /* int */ jpeg2000SPcodNumberOfDecompositionLevels = 0;
        var /* int */ jpeg2000SPcodCodeBlockWidth = 0;
        var /* int */ jpeg2000SPcodCodeBlockHeight = 0;
        var /* int */ jpeg2000SPcodCodeBlockStyle = 0;
        var /* int */ jpeg2000SPcodTransformation = 0;
        var /* int */ jpeg2000Lqcd = 0;
        var /* int */ jpeg2000Sqcd = 0;
        var /* int */ jpeg2000Lsot = 0;
        var /* int */ jpeg2000Isot = 0;
        var /* int */ jpeg2000Psot = 0;
        var /* int */ jpeg2000TPsot = 0;
        var /* int */ jpeg2000TNsot = 0;

        nPointer = -1;

        for (var memberID = 0; memberID < numberOfMembers; memberID += 1) {
            var /* int[] */ SectionNumbers = this.getGrib2Section(0); // Section 0: Indicator Section

            if (SectionNumbers.length > 1) {
                printst("Discipline of processed data:\t");
                this.DisciplineOfProcessedData = SectionNumbers[7];
                info.DisciplineOfProcessedData(lThis);

                printst("Length of message:\t");
                this.LengthOfMessage = uNumX8(SectionNumbers[9], SectionNumbers[10], SectionNumbers[11], SectionNumbers[12], SectionNumbers[13], SectionNumbers[14], SectionNumbers[15], SectionNumbers[16]);
                println(this.LengthOfMessage);
            }

            SectionNumbers = this.getGrib2Section(1); // Section 1: Identification Section

            if (SectionNumbers.length > 1) {
                printst("Identification of originating/generating centre: ");
                this.IdentificationOfCentre = uNumX2(SectionNumbers[6], SectionNumbers[7]);
                info.IdentificationOfCentre(lThis);

                printst("Sub-centre:\t");
                this.IdentificationOfSubCentre = uNumX2(SectionNumbers[8], SectionNumbers[9]);
                info.IdentificationOfSubCentre(lThis);

                printst("Master Tables Version Number:\t");
                this.MasterTablesVersionNumber = SectionNumbers[10];
                info.MasterTablesVersionNumber(lThis);

                printst("Local Tables Version Number:\t");
                this.LocalTablesVersionNumber = SectionNumbers[11];
                info.LocalTablesVersionNumber(lThis);

                printst("Significance of Reference Time:\t");
                this.SignificanceOfReferenceTime = SectionNumbers[12];
                info.SignificanceOfReferenceTime(lThis);

                printst("Year:\t");
                this.Year = uNumX2(SectionNumbers[13], SectionNumbers[14]);
                println(this.Year);

                printst("Month:\t");
                this.Month = SectionNumbers[15];
                println(this.Month);

                printst("Day:\t");
                this.Day = SectionNumbers[16];
                println(this.Day);

                printst("Hour:\t");
                this.Hour = SectionNumbers[17];
                println(this.Hour);

                printst("Minute:\t");
                this.Minute = SectionNumbers[18];
                println(this.Minute);

                printst("Second:\t");
                this.Second = SectionNumbers[19];
                println(this.Second);

                printst("Production status of data:\t");
                this.ProductionStatusOfData = SectionNumbers[20];
                info.ProductionStatusOfData(lThis);

                printst("Type of data:\t");
                this.TypeOfData = SectionNumbers[20];
                info.TypeOfData(lThis);
            }

            SectionNumbers = this.getGrib2Section(2); // Section 2: Local Use Section (optional)
            if (SectionNumbers.length > 1) {
                // don't do anything!
            }

            SectionNumbers = this.getGrib2Section(3); // Section 3: Grid Definition Section

            if (SectionNumbers.length > 1) {
                printst("Grid Definition Template Number:\t");
                this.TypeOfProjection = uNumX2(SectionNumbers[13], SectionNumbers[14]);
                switch (this.TypeOfProjection) {
                    case 0: gridDefScanningMode = 72; println("Latitude/longitude (equidistant cylindrical)"); break;
                    case 1: gridDefScanningMode = 72; println("Rotated latitude/longitude"); break;
                    case 2: gridDefScanningMode = 72; println("Stretched latitude/longitude"); break;
                    case 3: gridDefScanningMode = 72; println("Stretched and rotated latitude/longitude"); break;
                    case 4: gridDefScanningMode = 48; println("Variable resolution latitude/longitude"); break;
                    case 5: gridDefScanningMode = 48; println("Variable resolution rotated latitude/longitude"); break;
                    case 10: gridDefScanningMode = 60; println("Mercator"); break;
                    case 12: gridDefScanningMode = 60; println("Transverse Mercator"); break;
                    case 20: gridDefScanningMode = 65; println("Polar Stereographic Projection (can be north or south)"); gridDefScanningMode = 65; break;
                    case 30: gridDefScanningMode = 65; println("Lambert conformal (can be secant, tangent, conical, or bipolar)"); break;
                    case 31: gridDefScanningMode = 65; println("Albers equal area"); break;
                    case 40: gridDefScanningMode = 72; println("Gaussian latitude/longitude"); break;
                    case 41: gridDefScanningMode = 72; println("Rotated Gaussian latitude/longitude"); break;
                    case 42: gridDefScanningMode = 72; println("Stretched Gaussian latitude/longitude"); break;
                    case 43: gridDefScanningMode = 72; println("Stretched and rotated Gaussian latitude/longitude"); break;
                    case 50: println("Spherical harmonic coefficients"); break;
                    case 51: println("Rotated spherical harmonic coefficients"); break;
                    case 52: println("Stretched spherical harmonic coefficients"); break;
                    case 53: println("Stretched and rotated spherical harmonic coefficients"); break;
                    case 90: gridDefScanningMode = 64; println("Space view perspective orthographic"); break;
                    case 100: gridDefScanningMode = 34; println("Triangular grid based on an icosahedron"); break;
                    case 110: gridDefScanningMode = 57; println("Equatorial azimuthal equidistant projection"); break;
                    case 120: gridDefScanningMode = 39; println("Azimuth-range projection"); break;
                    case 140: gridDefScanningMode = 64; println("Lambert azimuthal equal area projection"); break;
                    case 204: gridDefScanningMode = 72; println("Curvilinear orthogonal grids"); break;
                    case 1000: println("Cross-section grid, with points equally spaced on the horizontal"); break;
                    case 1100: gridDefScanningMode = 51; println("Hovmöller diagram grid, with points equally spaced on the horizontal"); break;
                    case 1200: println("Time section grid"); break;
                    case 32768: gridDefScanningMode = 72; println("Rotated latitude/longitude (arakawa staggered E-grid)"); break;
                    case 32769: gridDefScanningMode = 72; println("Rotated latitude/longitude (arakawa non-E staggered grid)"); break;
                    case 65535: println("Missing"); break;
                    default: println(this.TypeOfProjection); break;
                }

                printst("Number of data points (Nx * Ny):\t");
                this.Np = uNumX4(SectionNumbers[gridDefNumberOfDataPoints], SectionNumbers[gridDefNumberOfDataPoints + 1], SectionNumbers[gridDefNumberOfDataPoints + 2], SectionNumbers[gridDefNumberOfDataPoints + 3]);
                println(this.Np);

                printst("Number of points along the X-axis:\t");
                this.Nx = uNumX4(SectionNumbers[gridDefNumberOfPointsAlongTheXaxis], SectionNumbers[gridDefNumberOfPointsAlongTheXaxis + 1], SectionNumbers[gridDefNumberOfPointsAlongTheXaxis + 2], SectionNumbers[gridDefNumberOfPointsAlongTheXaxis + 3]);
                println(this.Nx);

                printst("Number of points along the Y-axis:\t");
                this.Ny = uNumX4(SectionNumbers[gridDefNumberOfPointsAlongTheYaxis], SectionNumbers[gridDefNumberOfPointsAlongTheYaxis + 1], SectionNumbers[gridDefNumberOfPointsAlongTheYaxis + 2], SectionNumbers[gridDefNumberOfPointsAlongTheYaxis + 3]);
                println(this.Ny);

                if (this.TypeOfProjection === 0) { // Latitude/longitude
                    this.ResolutionAndComponentFlags = SectionNumbers[gridDefLatLonResolutionAndComponentFlags];
                    println("Resolution and component flags:\t" + this.ResolutionAndComponentFlags);

                    this.La1 = 0.000001 * sNumX4(SectionNumbers[gridDefLatLonLatitudeOfFirstGridPoint], SectionNumbers[gridDefLatLonLatitudeOfFirstGridPoint + 1], SectionNumbers[gridDefLatLonLatitudeOfFirstGridPoint + 2], SectionNumbers[gridDefLatLonLatitudeOfFirstGridPoint + 3]);
                    println("Latitude of first grid point:\t" + this.La1);

                    this.Lo1 = 0.000001 * uNumX4(SectionNumbers[gridDefLatLonLongitudeOfFirstGridPoint], SectionNumbers[gridDefLatLonLongitudeOfFirstGridPoint + 1], SectionNumbers[gridDefLatLonLongitudeOfFirstGridPoint + 2], SectionNumbers[gridDefLatLonLongitudeOfFirstGridPoint + 3]);
                    if (this.Lo1 === 180) this.Lo1 = -180;
                    println("Longitude of first grid point:\t" + this.Lo1);

                    this.La2 = 0.000001 * sNumX4(SectionNumbers[gridDefLatLonLatitudeOfLastGridPoint], SectionNumbers[gridDefLatLonLatitudeOfLastGridPoint + 1], SectionNumbers[gridDefLatLonLatitudeOfLastGridPoint + 2], SectionNumbers[gridDefLatLonLatitudeOfLastGridPoint + 3]);
                    println("Latitude of last grid point:\t" + this.La2);

                    this.Lo2 = 0.000001 * uNumX4(SectionNumbers[gridDefLatLonLongitudeOfLastGridPoint], SectionNumbers[gridDefLatLonLongitudeOfLastGridPoint + 1], SectionNumbers[gridDefLatLonLongitudeOfLastGridPoint + 2], SectionNumbers[gridDefLatLonLongitudeOfLastGridPoint + 3]);
                    if (this.Lo2 < this.Lo1) this.Lo2 += 360;
                    println("Longitude of last grid point:\t" + this.Lo2);
                } else if (this.TypeOfProjection === 1) { // Rotated latitude/longitude
                    this.ResolutionAndComponentFlags = SectionNumbers[gridDefLatLonResolutionAndComponentFlags];
                    println("Resolution and component flags:\t" + this.ResolutionAndComponentFlags);

                    this.La1 = 0.000001 * sNumX4(SectionNumbers[gridDefLatLonLatitudeOfFirstGridPoint], SectionNumbers[gridDefLatLonLatitudeOfFirstGridPoint + 1], SectionNumbers[gridDefLatLonLatitudeOfFirstGridPoint + 2], SectionNumbers[gridDefLatLonLatitudeOfFirstGridPoint + 3]);
                    println("Latitude of first grid point:\t" + this.La1);

                    this.Lo1 = 0.000001 * uNumX4(SectionNumbers[gridDefLatLonLongitudeOfFirstGridPoint], SectionNumbers[gridDefLatLonLongitudeOfFirstGridPoint + 1], SectionNumbers[gridDefLatLonLongitudeOfFirstGridPoint + 2], SectionNumbers[gridDefLatLonLongitudeOfFirstGridPoint + 3]);
                    if (this.Lo1 === 180) this.Lo1 = -180;
                    println("Longitude of first grid point:\t" + this.Lo1);

                    this.La2 = 0.000001 * sNumX4(SectionNumbers[gridDefLatLonLatitudeOfLastGridPoint], SectionNumbers[gridDefLatLonLatitudeOfLastGridPoint + 1], SectionNumbers[gridDefLatLonLatitudeOfLastGridPoint + 2], SectionNumbers[gridDefLatLonLatitudeOfLastGridPoint + 3]);
                    println("Latitude of last grid point:\t" + this.La2);

                    this.Lo2 = 0.000001 * uNumX4(SectionNumbers[gridDefLatLonLongitudeOfLastGridPoint], SectionNumbers[gridDefLatLonLongitudeOfLastGridPoint + 1], SectionNumbers[gridDefLatLonLongitudeOfLastGridPoint + 2], SectionNumbers[gridDefLatLonLongitudeOfLastGridPoint + 3]);
                    if (this.Lo2 < this.Lo1) this.Lo2 += 360;
                    println("Longitude of last grid point:\t" + this.Lo2);

                    this.SouthLat = 0.000001 * sNumX4(SectionNumbers[gridDefLatLonSouthPoleLatitude], SectionNumbers[gridDefLatLonSouthPoleLatitude + 1], SectionNumbers[gridDefLatLonSouthPoleLatitude + 2], SectionNumbers[gridDefLatLonSouthPoleLatitude + 3]);
                    println("Latitude of the southern pole of projection:\t" + this.SouthLat);

                    this.SouthLon = 0.000001 * uNumX4(SectionNumbers[gridDefLatLonSouthPoleLongitude], SectionNumbers[gridDefLatLonSouthPoleLongitude + 1], SectionNumbers[gridDefLatLonSouthPoleLongitude + 2], SectionNumbers[gridDefLatLonSouthPoleLongitude + 3]);
                    println("Longitude of the southern pole of projection:\t" + this.SouthLon);

                    this.Rotation = sNumX4(SectionNumbers[gridDefLatLonRotationOfProjection], SectionNumbers[gridDefLatLonRotationOfProjection + 1], SectionNumbers[gridDefLatLonRotationOfProjection + 2], SectionNumbers[gridDefLatLonRotationOfProjection + 3]);
                    println("Angle of rotation of projection:\t" + this.Rotation);
                } else if (this.TypeOfProjection === 20) { // Polar Stereographic Projection
                    this.ResolutionAndComponentFlags = SectionNumbers[gridDefPolarResolutionAndComponentFlags];
                    println("Resolution and component flags:\t" + this.ResolutionAndComponentFlags);

                    this.La1 = 0.000001 * sNumX4(SectionNumbers[gridDefPolarLatitudeOfFirstGridPoint], SectionNumbers[gridDefPolarLatitudeOfFirstGridPoint + 1], SectionNumbers[gridDefPolarLatitudeOfFirstGridPoint + 2], SectionNumbers[gridDefPolarLatitudeOfFirstGridPoint + 3]);
                    println("Latitude of first grid point:\t" + this.La1);

                    this.Lo1 = 0.000001 * uNumX4(SectionNumbers[gridDefPolarLongitudeOfFirstGridPoint], SectionNumbers[gridDefPolarLongitudeOfFirstGridPoint + 1], SectionNumbers[gridDefPolarLongitudeOfFirstGridPoint + 2], SectionNumbers[gridDefPolarLongitudeOfFirstGridPoint + 3]);
                    println("Longitude of first grid point:\t" + this.Lo1);

                    this.LaD = 0.000001 * sNumX4(SectionNumbers[gridDefPolarDeclinationOfTheGrid], SectionNumbers[gridDefPolarDeclinationOfTheGrid + 1], SectionNumbers[gridDefPolarDeclinationOfTheGrid + 2], SectionNumbers[gridDefPolarDeclinationOfTheGrid + 3]);
                    println("Latitude where Dx and Dy are specified:\t" + this.LaD);

                    this.LoV = 0.000001 * uNumX4(SectionNumbers[gridDefPolarOrientationOfTheGrid], SectionNumbers[gridDefPolarOrientationOfTheGrid + 1], SectionNumbers[gridDefPolarOrientationOfTheGrid + 2], SectionNumbers[gridDefPolarOrientationOfTheGrid + 3]);
                    println("Orientation of the grid:\t" + this.LoV);

                    this.Dx = 0.000001 * uNumX4(SectionNumbers[gridDefPolarXDirectionGridLength], SectionNumbers[gridDefPolarXDirectionGridLength + 1], SectionNumbers[gridDefPolarXDirectionGridLength + 2], SectionNumbers[gridDefPolarXDirectionGridLength + 3]);
                    println("X-direction grid length (km):\t" + this.Dx);

                    this.Dy = 0.000001 * uNumX4(SectionNumbers[gridDefPolarYDirectionGridLength], SectionNumbers[gridDefPolarYDirectionGridLength + 1], SectionNumbers[gridDefPolarYDirectionGridLength + 2], SectionNumbers[gridDefPolarYDirectionGridLength + 3]);
                    println("Y-direction grid length (km):\t" + this.Dy);

                    this.PCF = SectionNumbers[gridDefPolarProjectionCenterFlag];
                    println("Projection center flag:\t" + this.PCF);
                } else if (this.TypeOfProjection === 30) { // Lambert Conformal Projection
                    this.ResolutionAndComponentFlags = SectionNumbers[gridDefLambertResolutionAndComponentFlags];
                    println("Resolution and component flags:\t" + this.ResolutionAndComponentFlags);

                    this.La1 = 0.000001 * sNumX4(SectionNumbers[gridDefLambertLatitudeOfFirstGridPoint], SectionNumbers[gridDefLambertLatitudeOfFirstGridPoint + 1], SectionNumbers[gridDefLambertLatitudeOfFirstGridPoint + 2], SectionNumbers[gridDefLambertLatitudeOfFirstGridPoint + 3]);
                    println("Latitude of first grid point:\t" + this.La1);

                    this.Lo1 = 0.000001 * uNumX4(SectionNumbers[gridDefLambertLongitudeOfFirstGridPoint], SectionNumbers[gridDefLambertLongitudeOfFirstGridPoint + 1], SectionNumbers[gridDefLambertLongitudeOfFirstGridPoint + 2], SectionNumbers[gridDefLambertLongitudeOfFirstGridPoint + 3]);
                    println("Longitude of first grid point:\t" + this.Lo1);

                    this.LaD = 0.000001 * sNumX4(SectionNumbers[gridDefLambertDeclinationOfTheGrid], SectionNumbers[gridDefLambertDeclinationOfTheGrid + 1], SectionNumbers[gridDefLambertDeclinationOfTheGrid + 2], SectionNumbers[gridDefLambertDeclinationOfTheGrid + 3]);
                    println("Latitude where Dx and Dy are specified:\t" + this.LaD);

                    this.LoV = 0.000001 * uNumX4(SectionNumbers[gridDefLambertOrientationOfTheGrid], SectionNumbers[gridDefLambertOrientationOfTheGrid + 1], SectionNumbers[gridDefLambertOrientationOfTheGrid + 2], SectionNumbers[gridDefLambertOrientationOfTheGrid + 3]);
                    println("Orientation of the grid:\t" + this.LoV);

                    this.Dx = 0.000001 * uNumX4(SectionNumbers[gridDefLambertXDirectionGridLength], SectionNumbers[gridDefLambertXDirectionGridLength + 1], SectionNumbers[gridDefLambertXDirectionGridLength + 2], SectionNumbers[gridDefLambertXDirectionGridLength + 3]);
                    println("X-direction grid length (km):\t" + this.Dx);

                    this.Dy = 0.000001 * uNumX4(SectionNumbers[gridDefLambertYDirectionGridLength], SectionNumbers[gridDefLambertYDirectionGridLength + 1], SectionNumbers[gridDefLambertYDirectionGridLength + 2], SectionNumbers[gridDefLambertYDirectionGridLength + 3]);
                    println("Y-direction grid length (km):\t" + this.Dy);

                    this.PCF = SectionNumbers[gridDefLambertProjectionCenterFlag];
                    println("Projection center flag:\t" + this.PCF);

                    this.FirstLatIn = 0.000001 * sNumX4(SectionNumbers[gridDefLambert1stLatitudeIn], SectionNumbers[gridDefLambert1stLatitudeIn + 1], SectionNumbers[gridDefLambert1stLatitudeIn + 2], SectionNumbers[gridDefLambert1stLatitudeIn + 3]);
                    println("First latitude from the pole at which the secant cone cuts the sphere:\t" + this.FirstLatIn);

                    this.SecondLatIn = 0.000001 * sNumX4(SectionNumbers[gridDefLambert2ndLatitudeIn], SectionNumbers[gridDefLambert2ndLatitudeIn + 1], SectionNumbers[gridDefLambert2ndLatitudeIn + 2], SectionNumbers[gridDefLambert2ndLatitudeIn + 3]);
                    println("Second latitude from the pole at which the secant cone cuts the sphere:\t" + this.SecondLatIn);

                    this.SouthLat = 0.000001 * sNumX4(SectionNumbers[gridDefLambert2ndLatitudeIn], SectionNumbers[gridDefLambert2ndLatitudeIn + 1], SectionNumbers[gridDefLambert2ndLatitudeIn + 2], SectionNumbers[gridDefLambert2ndLatitudeIn + 3]);
                    println("Latitude of the southern pole of projection:\t" + this.SouthLat);

                    this.SouthLon = 0.000001 * uNumX4(SectionNumbers[gridDefLambertSouthPoleLongitude], SectionNumbers[gridDefLambertSouthPoleLongitude + 1], SectionNumbers[gridDefLambertSouthPoleLongitude + 2], SectionNumbers[gridDefLambertSouthPoleLongitude + 3]);
                    println("Longitude of the southern pole of projection:\t" + this.SouthLon);
                }

                printst("Flag bit numbers:\n");
                this.Flag_BitNumbers = binary(this.ResolutionAndComponentFlags, 8);
                {
                    if (this.Flag_BitNumbers.substring(2, 3) === "0") {
                        println("\ti direction increments not given");
                    } else {
                        println("\ti direction increments given");
                    }

                    if (this.Flag_BitNumbers.substring(3, 4) === "0") {
                        println("\tj direction increments not given");
                    } else {
                        println("\tj direction increments given");
                    }

                    if (this.Flag_BitNumbers.substring(4, 5) === "0") {
                        println("\tResolved u- and v- components of vector quantities relative to easterly and northerly directions");
                    } else {
                        println("\tResolved u- and v- components of vector quantities relative to the defined grid in the direction of increasing x and y (or i and j) coordinates respectively");
                    }
                }

                printst("Scanning mode:\t");
                this.ScanningMode = SectionNumbers[gridDefScanningMode];
                println(this.ScanningMode);

                this.ScanX = 1;
                this.ScanY = 1;

                printst("Mode bit numbers:\n");
                this.Mode_BitNumbers = binary(this.ScanningMode, 8);
                {
                    if (this.Mode_BitNumbers.substring(0, 1) === "0") {
                        println("\tPoints of first row or column scan in the +i (+x) direction");
                    } else {
                        println("\tPoints of first row or column scan in the -i (-x) direction");
                        this.ScanX = 0;
                    }

                    if (this.Mode_BitNumbers.substring(1, 2) === "0") {
                        println("\tPoints of first row or column scan in the -j (-y) direction");
                    } else {
                        println("\tPoints of first row or column scan in the +j (+y) direction");
                        this.ScanY = 0;
                    }

                    if (this.Mode_BitNumbers.substring(2, 3) === "0") {
                        println("\tAdjacent points in i (x) direction are consecutive");
                    } else {
                        println("\tAdjacent points in j (y) direction is consecutive");
                    }

                    if (this.Mode_BitNumbers.substring(3, 4) === "0") {
                        println("\tAll rows scan in the same direction");
                    } else {
                        println("\tAdjacent rows scan in opposite directions");
                    }
                }
            }

            SectionNumbers = this.getGrib2Section(4); // Section 4: Product Definition Section

            if (SectionNumbers.length > 1) {
                printst("Number of coordinate values after Template:\t");
                this.NumberOfCoordinateValuesAfterTemplate = uNumX2(SectionNumbers[6], SectionNumbers[7]);
                println(this.NumberOfCoordinateValuesAfterTemplate);

                printst("Number of coordinate values after Template:\t");
                this.ProductDefinitionTemplateNumber = uNumX2(SectionNumbers[8], SectionNumbers[9]);
                info.ProductDefinitionTemplateNumber(lThis);

                printst("Category of parameters by product discipline:\t");
                this.CategoryOfParametersByProductDiscipline = SectionNumbers[10];
                if (this.DisciplineOfProcessedData === 0) { // Meteorological
                    info.CategoryOfParametersByProductDiscipline(lThis);
                } else {
                    println(this.CategoryOfParametersByProductDiscipline);
                }

                printst("Parameter number by product discipline and parameter category:\t");
                this.ParameterNumberByProductDisciplineAndParameterCategory = SectionNumbers[11];

                if (this.DisciplineOfProcessedData === 0) { // Meteorological
                    if (this.CategoryOfParametersByProductDiscipline === 0) { // Temperature
                        info.ParameterNumberByProductDisciplineAndParameterCategory_0_0(lThis);
                    } else if (this.CategoryOfParametersByProductDiscipline === 1) { // Moisture
                        info.ParameterNumberByProductDisciplineAndParameterCategory_0_1(lThis);
                    } else if (this.CategoryOfParametersByProductDiscipline === 2) { // Momentum
                        info.ParameterNumberByProductDisciplineAndParameterCategory_0_2(lThis);
                    } else if (this.CategoryOfParametersByProductDiscipline === 3) { // Mass
                        info.ParameterNumberByProductDisciplineAndParameterCategory_0_3(lThis);
                    } else if (this.CategoryOfParametersByProductDiscipline === 4) { // Short wave radiation
                        info.ParameterNumberByProductDisciplineAndParameterCategory_0_4(lThis);
                    } else if (this.CategoryOfParametersByProductDiscipline === 5) { // Long wave radiation
                        info.ParameterNumberByProductDisciplineAndParameterCategory_0_5(lThis);
                    } else if (this.CategoryOfParametersByProductDiscipline === 6) { // Cloud
                        info.ParameterNumberByProductDisciplineAndParameterCategory_0_6(lThis);
                    } else if (this.CategoryOfParametersByProductDiscipline === 7) { // Thermodynamic stability indices
                        info.ParameterNumberByProductDisciplineAndParameterCategory_0_7(lThis);
                    } else if (this.CategoryOfParametersByProductDiscipline === 13) { // Aerosols
                        info.ParameterNumberByProductDisciplineAndParameterCategory_0_13(lThis);
                    } else if (this.CategoryOfParametersByProductDiscipline === 14) { // Trace gases
                        info.ParameterNumberByProductDisciplineAndParameterCategory_0_14(lThis);
                    } else if (this.CategoryOfParametersByProductDiscipline === 15) { // Radar
                        info.ParameterNumberByProductDisciplineAndParameterCategory_0_15(lThis);
                    } else if (this.CategoryOfParametersByProductDiscipline === 16) { // Forecast Radar Imagery
                        info.ParameterNumberByProductDisciplineAndParameterCategory_0_16(lThis);
                    } else if (this.CategoryOfParametersByProductDiscipline === 17) { // Electrodynamics
                        info.ParameterNumberByProductDisciplineAndParameterCategory_0_17(lThis);
                    } else if (this.CategoryOfParametersByProductDiscipline === 18) { // Nuclear/radiology
                        info.ParameterNumberByProductDisciplineAndParameterCategory_0_18(lThis);
                    } else if (this.CategoryOfParametersByProductDiscipline === 19) { // Physical atmospheric Properties
                        info.ParameterNumberByProductDisciplineAndParameterCategory_0_19(lThis);
                    } else if (this.CategoryOfParametersByProductDiscipline === 20) { // Atmospheric Chemical Constituents
                        info.ParameterNumberByProductDisciplineAndParameterCategory_0_20(lThis);
                    } else if (this.CategoryOfParametersByProductDiscipline === 190) { // CCITT IA5 string
                        info.ParameterNumberByProductDisciplineAndParameterCategory_0_190(lThis);
                    } else if (this.CategoryOfParametersByProductDiscipline === 191) { // Miscellaneous
                        info.ParameterNumberByProductDisciplineAndParameterCategory_0_191(lThis);
                    } else if (this.CategoryOfParametersByProductDiscipline === 192) { // Covariance
                        info.ParameterNumberByProductDisciplineAndParameterCategory_0_192(lThis);
                    }
                } else if (this.DisciplineOfProcessedData === 1) { // Hydrological
                    if (this.CategoryOfParametersByProductDiscipline === 0) { // Hydrology Basic
                        info.ParameterNumberByProductDisciplineAndParameterCategory_1_0(lThis);
                    } else if (this.CategoryOfParametersByProductDiscipline === 1) { // Hydrology Probabilities
                        info.ParameterNumberByProductDisciplineAndParameterCategory_1_1(lThis);
                    } else if (this.CategoryOfParametersByProductDiscipline === 2) { // Inland Water and Sediment Properties
                        info.ParameterNumberByProductDisciplineAndParameterCategory_1_2(lThis);
                    }
                } else if (this.DisciplineOfProcessedData === 2) { // Land surface
                    if (this.CategoryOfParametersByProductDiscipline === 0) { // Vegetation/Biomass
                        info.ParameterNumberByProductDisciplineAndParameterCategory_2_0(lThis);
                    } else if (this.CategoryOfParametersByProductDiscipline === 1) { // Agricultural/aquacultural special products
                        info.ParameterNumberByProductDisciplineAndParameterCategory_2_1(lThis);
                    } else if (this.CategoryOfParametersByProductDiscipline === 3) { // Soil
                        info.ParameterNumberByProductDisciplineAndParameterCategory_2_3(lThis);
                    } else if (this.CategoryOfParametersByProductDiscipline === 4) { // Fire Weather
                        info.ParameterNumberByProductDisciplineAndParameterCategory_2_4(lThis);
                    }
                } else if (this.DisciplineOfProcessedData === 3) { // Space
                    if (this.CategoryOfParametersByProductDiscipline === 0) { // Image format
                        info.ParameterNumberByProductDisciplineAndParameterCategory_3_0(lThis);
                    } else if (this.CategoryOfParametersByProductDiscipline === 1) { // Quantitative
                        info.ParameterNumberByProductDisciplineAndParameterCategory_3_1(lThis);
                    } else if (this.CategoryOfParametersByProductDiscipline === 192) { // Forecast Satellite Imagery
                        info.ParameterNumberByProductDisciplineAndParameterCategory_3_192(lThis);
                    }
                } else if (this.DisciplineOfProcessedData === 4) { // Space Weather
                    if (this.CategoryOfParametersByProductDiscipline === 0) { // Temperature
                        info.ParameterNumberByProductDisciplineAndParameterCategory_4_0(lThis);
                    } else if (this.CategoryOfParametersByProductDiscipline === 1) { // Momentum
                        info.ParameterNumberByProductDisciplineAndParameterCategory_4_1(lThis);
                    } else if (this.CategoryOfParametersByProductDiscipline === 2) { // Charged Particle Mass and Number
                        info.ParameterNumberByProductDisciplineAndParameterCategory_4_2(lThis);
                    } else if (this.CategoryOfParametersByProductDiscipline === 3) { // Electric and Magnetic Fields
                        info.ParameterNumberByProductDisciplineAndParameterCategory_4_3(lThis);
                    } else if (this.CategoryOfParametersByProductDiscipline === 4) { // Energetic Particles
                        info.ParameterNumberByProductDisciplineAndParameterCategory_4_4(lThis);
                    } else if (this.CategoryOfParametersByProductDiscipline === 5) { // Waves
                        info.ParameterNumberByProductDisciplineAndParameterCategory_4_5(lThis);
                    } else if (this.CategoryOfParametersByProductDiscipline === 6) { // Solar Electromagnetic Emissions
                        info.ParameterNumberByProductDisciplineAndParameterCategory_4_6(lThis);
                    } else if (this.CategoryOfParametersByProductDiscipline === 7) { // Terrestrial Electromagnetic Emissions
                        info.ParameterNumberByProductDisciplineAndParameterCategory_4_7(lThis);
                    } else if (this.CategoryOfParametersByProductDiscipline === 8) { // Imagery
                        info.ParameterNumberByProductDisciplineAndParameterCategory_4_8(lThis);
                    } else if (this.CategoryOfParametersByProductDiscipline === 9) { // Ion-Neutral Coupling
                        info.ParameterNumberByProductDisciplineAndParameterCategory_4_9(lThis);
                    }
                } else if (this.DisciplineOfProcessedData === 10) { // Oceanographic
                    if (this.CategoryOfParametersByProductDiscipline === 0) { // Waves
                        info.ParameterNumberByProductDisciplineAndParameterCategory_10_0(lThis);
                    } else if (this.CategoryOfParametersByProductDiscipline === 1) { // Currents
                        info.ParameterNumberByProductDisciplineAndParameterCategory_10_1(lThis);
                    } else if (this.CategoryOfParametersByProductDiscipline === 2) { // Ice
                        info.ParameterNumberByProductDisciplineAndParameterCategory_10_2(lThis);
                    } else if (this.CategoryOfParametersByProductDiscipline === 3) { // Surface Properties
                        info.ParameterNumberByProductDisciplineAndParameterCategory_10_3(lThis);
                    } else if (this.CategoryOfParametersByProductDiscipline === 4) { // Sub-surface Properties
                        info.ParameterNumberByProductDisciplineAndParameterCategory_10_4(lThis);
                    } else if (this.CategoryOfParametersByProductDiscipline === 191) { // Miscellaneous
                        info.ParameterNumberByProductDisciplineAndParameterCategory_10_191(lThis);
                    }
                } else {
                    this.ParameterNameAndUnit = nf0(this.ParameterNumberByProductDisciplineAndParameterCategory, 0);
                }
                println(this.ParameterNameAndUnit);

                var /* float */ DayPortion = 0;

                printst("Indicator of unit of time range:\t");
                this.IndicatorOfUnitOfTimeRange = SectionNumbers[18];
                switch (this.IndicatorOfUnitOfTimeRange) {
                    case 0: println("Minute"); DayPortion = 1.0 / 60.0; break;
                    case 1: println("Hour"); DayPortion = 1; break;
                    case 2: println("Day"); DayPortion = 24; break;
                    case 3: println("Month"); DayPortion = 30.5 * 24; break;
                    case 4: println("Year"); DayPortion = 365 * 24; break;
                    case 5: println("Decade (10 years)"); DayPortion = 10 * 365 * 24; break;
                    case 6: println("Normal (30 years)"); DayPortion = 30 * 365 * 24; break;
                    case 7: println("Century (100 years)"); DayPortion = 100 * 365 * 24; break;
                    case 10: println("3 hours"); DayPortion = 3; break;
                    case 11: println("6 hours"); DayPortion = 6; break;
                    case 12: println("12 hours"); DayPortion = 12; break;
                    case 13: println("Second"); DayPortion = 1.0 / 3600.0; break;
                    case 255: println("Missing"); DayPortion = 0; break;
                    default: println(this.IndicatorOfUnitOfTimeRange); break;
                }

                printst("Forecast time in defined units:\t");
                this.ForecastTimeInDefinedUnits = uNumX4(SectionNumbers[19], SectionNumbers[20], SectionNumbers[21], SectionNumbers[22]);

                if (this.ProductDefinitionTemplateNumber === 8) { // Average, accumulation, extreme values or other statistically processed values at a horizontal level or in a horizontal layer in a continuous or non-continuous time interval. (see Template 4.8)
                    this.ForecastTimeInDefinedUnits += uNumX4(SectionNumbers[50], SectionNumbers[51], SectionNumbers[52], SectionNumbers[53]);
                } else if (this.ProductDefinitionTemplateNumber === 9) { // Probability forecasts at a horizontal level or in a horizontal layer in a continuous or non-continuous time interval. (see Template 4.9)
                    this.ForecastTimeInDefinedUnits += uNumX4(SectionNumbers[63], SectionNumbers[64], SectionNumbers[65], SectionNumbers[66]);
                } else if (this.ProductDefinitionTemplateNumber === 10) { // Percentile forecasts at a horizontal level or in a horizontal layer in a continuous or non-continuous time interval. (see Template 4.10)
                    this.ForecastTimeInDefinedUnits += uNumX4(SectionNumbers[51], SectionNumbers[52], SectionNumbers[53], SectionNumbers[54]);
                } else if (this.ProductDefinitionTemplateNumber === 11) { // Individual ensemble forecast, control and perturbed, at a horizontal level or in a horizontal layer, in a continuous or non-continuous time interval. (see Template 4.11)
                    this.ForecastTimeInDefinedUnits += uNumX4(SectionNumbers[53], SectionNumbers[54], SectionNumbers[55], SectionNumbers[56]);
                } else if (this.ProductDefinitionTemplateNumber === 12) { // Derived forecasts based on all ensemble members at a horizontal level or in a horizontal layer, in a continuous or non-continuous time interval. (see Template 4.12)
                    this.ForecastTimeInDefinedUnits += uNumX4(SectionNumbers[52], SectionNumbers[53], SectionNumbers[54], SectionNumbers[55]);
                } else if (this.ProductDefinitionTemplateNumber === 13) { // Derived forecasts based on a cluster of ensemble members over a rectangular area at a horizontal level or in a horizontal layer, in a continuous or non-continuous time interval. (see Template 4.13)
                    this.ForecastTimeInDefinedUnits += uNumX4(SectionNumbers[84], SectionNumbers[85], SectionNumbers[86], SectionNumbers[87]);
                } else if (this.ProductDefinitionTemplateNumber === 14) { // Derived forecasts based on a cluster of ensemble members over a circular area at a horizontal level or in a horizontal layer, in a continuous or non-continuous time interval. (see Template 4.14)
                    this.ForecastTimeInDefinedUnits += uNumX4(SectionNumbers[80], SectionNumbers[81], SectionNumbers[82], SectionNumbers[83]);
                } else if (this.ProductDefinitionTemplateNumber === 42) { // Average, accumulation, and/or extreme values or other statistically processed values at a horizontal level or in a horizontal layer in a continuous or non-continuous time interval for atmospheric chemical constituents. (see Template 4.42)
                    this.ForecastTimeInDefinedUnits += uNumX4(SectionNumbers[52], SectionNumbers[53], SectionNumbers[54], SectionNumbers[55]);
                } else if (this.ProductDefinitionTemplateNumber === 43) { // Individual ensemble forecast, control and perturbed, at a horizontal level or in a horizontal layer, in a continuous or non-continuous time interval for atmospheric chemical constituents. (see Template 4.43)
                    this.ForecastTimeInDefinedUnits += uNumX4(SectionNumbers[55], SectionNumbers[56], SectionNumbers[57], SectionNumbers[58]);
                } else if (this.ProductDefinitionTemplateNumber === 46) { // Average, accumulation, and/or extreme values or other statistically processed values at a horizontal level or in a horizontal layer in a continuous or non-continuous time interval for aerosol. (see Template 4.46)
                    this.ForecastTimeInDefinedUnits += uNumX4(SectionNumbers[63], SectionNumbers[64], SectionNumbers[65], SectionNumbers[66]);
                } else if (this.ProductDefinitionTemplateNumber === 47) { // Individual ensemble forecast, control and perturbed, at a horizontal level or in a horizontal layer, in a continuous or non-continuous time interval for aerosol. (see Template 4.47)
                    this.ForecastTimeInDefinedUnits += uNumX4(SectionNumbers[66], SectionNumbers[67], SectionNumbers[68], SectionNumbers[69]);
                }
                println(this.ForecastTimeInDefinedUnits);

                this.ForecastConvertedTime = this.ForecastTimeInDefinedUnits * DayPortion;

                printst("Type of first fixed surface:\t");
                this.TypeOfFirstFixedSurface = SectionNumbers[23];
                info.TypeOfFirstFixedSurface(lThis);
            }

            SectionNumbers = this.getGrib2Section(5); // Section 5: Data Representation Section

            if (SectionNumbers.length > 1) {
                printst("Number of data points:\t");
                this.NumberOfDataPoints = uNumX4(SectionNumbers[6], SectionNumbers[7], SectionNumbers[8], SectionNumbers[9]);
                println(this.NumberOfDataPoints);

                printst("Data Representation Template Number:\t");
                this.DataRepresentationTemplateNumber = uNumX2(SectionNumbers[10], SectionNumbers[11]);
                info.DataRepresentationTemplateNumber(lThis);

                printst("Reference value (R):\t");
                this.ReferenceValue = IEEE32(IntToBinary32(uNumX4(SectionNumbers[12], SectionNumbers[13], SectionNumbers[14], SectionNumbers[15])));
                println(this.ReferenceValue);

                printst("Binary Scale Factor (E):\t");
                this.BinaryScaleFactor = sNumX2(SectionNumbers[16], SectionNumbers[17]);
                println(this.BinaryScaleFactor);

                printst("Decimal Scale Factor (D):\t");
                this.DecimalScaleFactor = sNumX2(SectionNumbers[18], SectionNumbers[19]);
                println(this.DecimalScaleFactor);

                printst("Number of bits used for each packed value:\t");
                this.NumberOfBitsUsedForEachPackedValue = SectionNumbers[20];
                println(this.NumberOfBitsUsedForEachPackedValue);

                printst("Type of original field values:\t");
                jpeg2000TypeOfOriginalFieldValues = SectionNumbers[21];
                switch (jpeg2000TypeOfOriginalFieldValues) {
                    case 0: println("Floating point"); break;
                    case 1: println("Integer"); break;
                    case 255: println("Missing"); break;
                    default: println(jpeg2000TypeOfOriginalFieldValues); break;
                }

                // parameters over 21 used in Complex Packings e.g JPEG-2000
                jpeg2000TypeOfCompression = -1;
                jpeg2000TargetCompressionRatio = -1;
                if (this.DataRepresentationTemplateNumber === 40) { // Grid point data – JPEG 2000 Code Stream Format
                    printst("JPEG-2000/Type of Compression:\t");
                    jpeg2000TypeOfCompression = SectionNumbers[22];
                    switch (jpeg2000TypeOfCompression) {
                        case 0: println("Lossless"); break;
                        case 1: println("Lossy"); break;
                        case 255: println("Missing"); break;
                        default: println(jpeg2000TypeOfCompression); break;
                    }

                    printst("JPEG-2000/Target compression ratio (M):\t");
                    jpeg2000TargetCompressionRatio = SectionNumbers[23];
                    println(jpeg2000TargetCompressionRatio);
                    //The compression ratio M:1 (e.g. 20:1) specifies that the encoded stream should be less than ((1/M) x depth x number of data points) bits,
                    //where depth is specified in octet 20 and number of data points is specified in octets 6-9 of the Data Representation Section.
                } else if ((this.DataRepresentationTemplateNumber === 2) || // Grid point data - complex packing
                    (this.DataRepresentationTemplateNumber === 3)) { // Grid point data - complex packing and spatial differencing
                    printst("ComplexPacking/Type of Compression:\t");
                    ComplexPackingGroupSplittingMethodUsed = SectionNumbers[22];
                    switch (ComplexPackingGroupSplittingMethodUsed) {
                        case 0: println("Row by row splitting"); break;
                        case 1: println("General group splitting"); break;
                        case 255: println("Missing"); break;
                        default: println(ComplexPackingGroupSplittingMethodUsed); break;
                    }

                    printst("ComplexPacking/Missing value management used:\t");
                    ComplexPackingMissingValueManagementUsed = SectionNumbers[23];
                    switch (ComplexPackingMissingValueManagementUsed) {
                        case 0: println("No explicit missing values included within data values"); break;
                        case 1: println("Primary missing values included within data values"); break;
                        case 2: println("Primary and secondary missing values included within data values"); break;
                        case 255: println("Missing"); break;
                        default: println(ComplexPackingMissingValueManagementUsed); break;
                    }

                    printst("ComplexPacking/Primary missing value substitute:\t");
                    ComplexPackingPrimaryMissingValueSubstitute = IEEE32(IntToBinary32(uNumX4(SectionNumbers[24], SectionNumbers[25], SectionNumbers[26], SectionNumbers[27])));
                    println(ComplexPackingPrimaryMissingValueSubstitute);

                    printst("ComplexPacking/Secondary missing value substitute:\t");
                    ComplexPackingSecondaryMissingValueSubstitute = IEEE32(IntToBinary32(uNumX4(SectionNumbers[28], SectionNumbers[29], SectionNumbers[30], SectionNumbers[31])));
                    println(ComplexPackingSecondaryMissingValueSubstitute);

                    printst("ComplexPacking/Number of groups of data values into which field is split:\t");
                    ComplexPackingNumberOfGroupsOfDataValues = uNumX4(SectionNumbers[32], SectionNumbers[33], SectionNumbers[34], SectionNumbers[35]);
                    println(ComplexPackingNumberOfGroupsOfDataValues);

                    printst("ComplexPacking/Reference for group widths:\t");
                    ComplexPackingReferenceForGroupWidths = SectionNumbers[36];
                    println(ComplexPackingReferenceForGroupWidths);

                    printst("ComplexPacking/Number of bits used for group widths:\t");
                    ComplexPackingNumberOfBitsUsedForGroupWidths = SectionNumbers[37];
                    println(ComplexPackingNumberOfBitsUsedForGroupWidths);

                    printst("ComplexPacking/Reference for group lengths:\t");
                    ComplexPackingReferenceForGroupLengths = uNumX4(SectionNumbers[38], SectionNumbers[39], SectionNumbers[40], SectionNumbers[41]);
                    println(ComplexPackingReferenceForGroupLengths);

                    printst("ComplexPacking/Length increment for the group lengths:\t");
                    ComplexPackingLengthIncrementForTheGroupLengths = SectionNumbers[42];
                    println(ComplexPackingLengthIncrementForTheGroupLengths);

                    printst("ComplexPacking/True length of last group:\t");
                    ComplexPackingTrueLengthOfLastGroup = uNumX4(SectionNumbers[43], SectionNumbers[44], SectionNumbers[45], SectionNumbers[46]);
                    println(ComplexPackingTrueLengthOfLastGroup);

                    printst("ComplexPacking/Number of bits used for the scaled group lengths:\t");
                    ComplexPackingNumberOfBitsUsedForTheScaledGroupLengths = SectionNumbers[47];
                    println(ComplexPackingNumberOfBitsUsedForTheScaledGroupLengths);

                    if (this.DataRepresentationTemplateNumber === 3) { // Grid point data - complex packing and spatial differencing
                        printst("ComplexPacking/Order of Spatial Differencing:\t");
                        ComplexPackingOrderOfSpatialDifferencing = SectionNumbers[48];
                        println(ComplexPackingOrderOfSpatialDifferencing);

                        printst("ComplexPacking/Number of octets required in the Data Section to specify the extra descriptors:\t");
                        ComplexPackingNumberOfExtraOctetsRequiredInDataSection = SectionNumbers[49];
                        println(ComplexPackingNumberOfExtraOctetsRequiredInDataSection);
                    }
                }
            }

            //////////////////////////////////////////////////
            if (this.DataAllocated === false) {
                this.DataTitles = [];
                this.DataValues = [];
                for (var i = 0; i < numMembers; i++) {
                    this.DataValues[i] = new Float32Array(this.Nx * this.Ny);
                }

                this.DataAllocated = true;
            }
            //////////////////////////////////////////////////

            SectionNumbers = this.getGrib2Section(6); // Section 6: Bit-Map Section

            if (SectionNumbers.length > 1) {
                printst("Bit map indicator:\t");
                this.Bitmap_Indicator = SectionNumbers[6];
                info.Bitmap_Indicator(lThis);

                if (this.Bitmap_Indicator === 0) { // A bit map applies to this product and is specified in this Section.
                    this.NullBitmapFlags = new Int32Array((SectionNumbers.length - 7) * 8);

                    println(">>>>> NullBitmapFlags.length", this.NullBitmapFlags.length);

                    for (var i = 0; i < SectionNumbers.length - 7; i++) {
                        var /* String */ b = binary(SectionNumbers[7 + i], 8);

                        for (var j = 0; j < 8; j++) {
                            this.NullBitmapFlags[i * 8 + j] = parseInt(b.substring(j, j + 1));
                        }
                    }
                }
            }

            if (this.DataRepresentationTemplateNumber === 40) { // Grid point data – JPEG 2000 Code Stream Format
                BitmapBeginPointer = nPointer + 6;

                SectionNumbers = this.getGrib2Section(7); // Section 7: Data Section

                if (SectionNumbers.length > 100) { // ???????? to handle the case of no bitmap
                    BitmapEndPointer = nPointer;

                    var n = BitmapBeginPointer;

                    println(hex(this.fileBytes[n], 2), hex(this.fileBytes[n + 1], 2));  // FF 4F : Marker Start of codestream
                    n += 2;

                    println(hex(this.fileBytes[n], 2), hex(this.fileBytes[n + 1], 2));  // FF 51 : Marker Image and tile size
                    n += 2;

                    jpeg2000Lsiz = uNumX2(this.fileBytes[n], this.fileBytes[n + 1]);
                    println("Lsiz =", jpeg2000Lsiz);  // Lsiz : Length of marker segment in bytes (not including the marker)
                    n += 2;

                    jpeg2000Rsiz = uNumX2(this.fileBytes[n], this.fileBytes[n + 1]);
                    println("Rsiz =", jpeg2000Rsiz);  // Rsiz : Denotes capabilities that a decoder needs to properly decode the codestream
                    n += 2;
                    printst("\t");
                    switch (jpeg2000Rsiz) {
                        case 0: println("Capabilities specified in this Recommendation | International Standard only"); break;
                        case 1: println("Codestream restricted as described for Profile 0 from Table A.45"); break;
                        case 2: println("Codestream restricted as described for Profile 1 from Table A.45"); break;
                        default: println("Reserved"); break;
                    }

                    jpeg2000Xsiz = uNumX4(this.fileBytes[n], this.fileBytes[n + 1], this.fileBytes[n + 2], this.fileBytes[n + 3]);
                    println("Xsiz =", jpeg2000Xsiz);  // Xsiz : Width of the reference grid
                    n += 4;

                    jpeg2000Ysiz = uNumX4(this.fileBytes[n], this.fileBytes[n + 1], this.fileBytes[n + 2], this.fileBytes[n + 3]);
                    println("Ysiz =", jpeg2000Ysiz);  // Ysiz : Height of the reference grid
                    n += 4;

                    jpeg2000XOsiz = uNumX4(this.fileBytes[n], this.fileBytes[n + 1], this.fileBytes[n + 2], this.fileBytes[n + 3]);
                    println("XOsiz =", jpeg2000XOsiz);  // XOsiz : Horizontal offset from the origin of the reference grid to the left side of the image area
                    n += 4;

                    jpeg2000YOsiz = uNumX4(this.fileBytes[n], this.fileBytes[n + 1], this.fileBytes[n + 2], this.fileBytes[n + 3]);
                    println("YOsiz =", jpeg2000YOsiz);  // YOsiz : Vertical offset from the origin of the reference grid to the top side of the image area
                    n += 4;

                    jpeg2000XTsiz = uNumX4(this.fileBytes[n], this.fileBytes[n + 1], this.fileBytes[n + 2], this.fileBytes[n + 3]);
                    println("XTsiz =", jpeg2000XTsiz);  // XTsiz : Width of one reference tile with respect to the reference grid
                    n += 4;

                    jpeg2000YTsiz = uNumX4(this.fileBytes[n], this.fileBytes[n + 1], this.fileBytes[n + 2], this.fileBytes[n + 3]);
                    println("YTsiz =", jpeg2000YTsiz);  // YTsiz : Height of one reference tile with respect to the reference grid
                    n += 4;

                    jpeg2000XTOsiz = uNumX4(this.fileBytes[n], this.fileBytes[n + 1], this.fileBytes[n + 2], this.fileBytes[n + 3]);
                    println("XTOsiz =", jpeg2000XTOsiz);  // XTOsiz : Horizontal offset from the origin of the reference grid to the left side of the first tile
                    n += 4;

                    jpeg2000YTOsiz = uNumX4(this.fileBytes[n], this.fileBytes[n + 1], this.fileBytes[n + 2], this.fileBytes[n + 3]);
                    println("YTOsiz =", jpeg2000YTOsiz);  // YTOsiz : Vertical offset from the origin of the reference grid to the top side of the first tile
                    n += 4;

                    jpeg2000Csiz = uNumX2(this.fileBytes[n], this.fileBytes[n + 1]);
                    println("Csiz =", jpeg2000Csiz);  // Csiz : Number of components in the image
                    n += 2;

                    jpeg2000Ssiz = this.fileBytes[n];
                    println("Ssiz =", jpeg2000Ssiz);  // Ssiz : Precision (depth) in bits and sign of the ith component samples
                    n += 1;

                    jpeg2000XRsiz = this.fileBytes[n];
                    println("XRsiz =", jpeg2000XRsiz);  // XRsiz : Horizontal separation of a sample of ith component with respect to the reference grid. There is one occurrence of this parameter for each component
                    n += 1;

                    jpeg2000YRsiz = this.fileBytes[n];
                    println("YRsiz =", jpeg2000YRsiz);  // YRsiz : Vertical separation of a sample of ith component with respect to the reference grid. There is one occurrence of this parameter for each component.
                    n += 1;

                    if ((this.fileBytes[n] === -1) && (this.fileBytes[n + 1] === 100)) { // the case of optional Comment
                        println(hex(this.fileBytes[n], 2), hex(this.fileBytes[n + 1], 2));  // FF 64 : Marker Comment
                        n += 2;

                        jpeg2000Lcom = uNumX2(this.fileBytes[n], this.fileBytes[n + 1]);
                        println("Lcom =", jpeg2000Lcom);  // Lcom : Length of marker segment in bytes (not including the marker)
                        n += 2;

                        jpeg2000Rcom = uNumX2(this.fileBytes[n], this.fileBytes[n + 1]);
                        println("Rcom =", jpeg2000Rcom);  // Rcom : Registration value of the marker segment
                        n += 2;

                        printst("Comment: ");
                        for (var i = 0; i < jpeg2000Lcom - 4; i++) {
                            cout(this.fileBytes[n]);
                            n += 1;
                        }
                        println();
                    }

                    println("numXtiles:", (jpeg2000Xsiz - jpeg2000XTOsiz) / jpeg2000XTsiz);
                    println("numYtiles:", (jpeg2000Ysiz - jpeg2000YTOsiz) / jpeg2000YTsiz);

                    println(hex(this.fileBytes[n], 2), hex(this.fileBytes[n + 1], 2));  // FF 52 : Marker Coding style default
                    n += 2;

                    jpeg2000Lcod = uNumX2(this.fileBytes[n], this.fileBytes[n + 1]);
                    println("Lcod =", jpeg2000Lcod);  // Lcod : Length of marker segment in bytes (not including the marker)
                    n += 2;

                    jpeg2000Scod = this.fileBytes[n];
                    println("Scod =", jpeg2000Scod);  // Scod : Coding style for all components
                    n += 1;

                    // SGcod : Parameters for coding style designated in Scod. The parameters are independent of components.

                    jpeg2000SGcodProgressionOrder = this.fileBytes[n];
                    println("jpeg2000SGcodProgressionOrder =", jpeg2000SGcodProgressionOrder); // Progression order
                    n += 1;

                    jpeg2000SGcodNumberOfLayers = uNumX2(this.fileBytes[n], this.fileBytes[n + 1]);
                    println("jpeg2000SGcodNumberOfLayers =", jpeg2000SGcodNumberOfLayers); // Number of layers
                    n += 2;

                    jpeg2000SGcodMultipleComponentTransformation = this.fileBytes[n];
                    println("jpeg2000SGcodMultipleComponentTransformation =", jpeg2000SGcodMultipleComponentTransformation); // Multiple component transformation usage
                    n += 1;

                    // SPcod : Parameters for coding style designated in Scod. The parameters relate to all components.

                    jpeg2000SPcodNumberOfDecompositionLevels = this.fileBytes[n];
                    println("jpeg2000SPcodNumberOfDecompositionLevels =", jpeg2000SPcodNumberOfDecompositionLevels); // Number of decomposition levels, NL, Zero implies no transformation.
                    n += 1;

                    jpeg2000SPcodCodeBlockWidth = this.fileBytes[n];
                    println("jpeg2000SPcodCodeBlockWidth =", jpeg2000SPcodCodeBlockWidth); // Code-block width
                    n += 1;

                    jpeg2000SPcodCodeBlockHeight = this.fileBytes[n];
                    println("jpeg2000SPcodCodeBlockHeight =", jpeg2000SPcodCodeBlockHeight); // Code-block height
                    n += 1;

                    jpeg2000SPcodCodeBlockStyle = this.fileBytes[n];
                    println("jpeg2000SPcodCodeBlockStyle =", jpeg2000SPcodCodeBlockStyle); // Code-block style
                    n += 1;

                    jpeg2000SPcodTransformation = this.fileBytes[n];
                    println("jpeg2000SPcodTransformation =", jpeg2000SPcodTransformation); // Wavelet transformation used
                    n += 1;

                    //Ii through In: Precinct sizePrecinct size
                    //If Scod or Scoc = xxxx xxx0, this parameter is not presen; otherwise
                    //this indicates precinct width and height. The first parameter (8 bits)
                    //corresponds to the NLLL sub-band. Each successive parameter
                    //corresponds to each successive resolution level in order.

                    println(hex(this.fileBytes[n], 2), hex(this.fileBytes[n + 1], 2));  // FF 5C : Marker Quantization default
                    n += 2;

                    jpeg2000Lqcd = uNumX2(this.fileBytes[n], this.fileBytes[n + 1]);
                    println("Lqcd =", jpeg2000Lqcd);  // Lqcd : Length of marker segment in bytes (not including the marker)
                    n += 2;

                    jpeg2000Sqcd = this.fileBytes[n];
                    println("Sqcd =", jpeg2000Sqcd);  // Sqcd : Quantization style for all components
                    n += 1;

                    //var /* int */ jpeg2000SPgcd = function(...);
                    //println("SPgcd =", jpeg2000SPcod);  // SPgcd : Quantization step size value for the ith sub-band in the defined order
                    n += jpeg2000Lqcd - 3;

                    println(hex(this.fileBytes[n], 2), hex(this.fileBytes[n + 1], 2));  // FF 90 : Marker Start of tile-part
                    n += 2;

                    jpeg2000Lsot = uNumX2(this.fileBytes[n], this.fileBytes[n + 1]);
                    println("Lsot =", jpeg2000Lsot);  // Lsot : Length of marker segment in bytes (not including the marker)
                    n += 2;

                    jpeg2000Isot = uNumX2(this.fileBytes[n], this.fileBytes[n + 1]);
                    println("Isot =", jpeg2000Isot);  // Isot : Tile index. This number refers to the tiles in raster order starting at the number 0
                    n += 2;

                    jpeg2000Psot = uNumX4(this.fileBytes[n], this.fileBytes[n + 1], this.fileBytes[n + 2], this.fileBytes[n + 3]);
                    println("Psot =", jpeg2000Psot);  // Psot : Length, in bytes, from the beginning of the first byte of this SOT marker segment of the tile-part to the end of the data of that tile-part. Figure A.16 shows this alignment. Only the last tile-part in the codestream may contain a 0 for Psot. If the Psot is 0, this tile-part is assumed to contain all data until the EOC marker.
                    n += 4;

                    jpeg2000TPsot = this.fileBytes[n];
                    println("TPsot =", jpeg2000TPsot);  // TPsot : Tile-part index. There is a specific order required for decoding tile-parts; this index denotes the order from 0. If there is only one tile-part for a tile, then this value is zero. The tile-parts of this tile shall appear in the codestream in this order, although not necessarily consecutively.
                    n += 1;

                    jpeg2000TNsot = this.fileBytes[n];
                    println("TNsot =", jpeg2000TNsot);  // TNsot : Number of tile-parts of a tile in the codestream. Two values are allowed: the correct number of tileparts for that tile and zero. A zero value indicates that the number of tile-parts of this tile is not specified in this tile-part.
                    n += 1;
                    printst("\t");
                    switch (jpeg2000TNsot) {
                        case 0: println("Number of tile-parts of this tile in the codestream is not defined in this header"); break;
                        default: println("Number of tile-parts of this tile in the codestream"); break;
                    }

                    println(hex(this.fileBytes[n], 2), hex(this.fileBytes[n + 1], 2));  // FF 93 : Start of data
                    n += 2;

                    this.printMore(n, 2); // <<<<<<<<<<<<<<<<<<<<
                    n += 2;

                    var /* byte[] */ imageBytes = new Uint8Array(1 + BitmapEndPointer - BitmapBeginPointer);
                    for (var i = 0; i < imageBytes.length; i++) {
                        imageBytes[i] = this.fileBytes[i + BitmapBeginPointer];
                    }
                    if (numMembers > 1) {
                        this.DataTitles[memberID] += nf0(memberID, 2);
                    }

                    this.data = options.jpeg2000decoder(imageBytes);
                } else {
                    if (numMembers > 1) {
                        this.DataTitles[memberID] += nf0(memberID, 2);
                    }
                }
            } else if ((this.DataRepresentationTemplateNumber === 0) || // Grid point data - simple packing

                (this.DataRepresentationTemplateNumber === 2) || // Grid point data - complex packing
                (this.DataRepresentationTemplateNumber === 3)) { // Grid point data - complex packing and spatial differencing
                BitmapBeginPointer = nPointer + 6;

                //s = this.getGrib2Section(7); // Section 7: Data Section

                //if (SectionNumbers.length > 1)
                { // ? to handle the case of no bitmap
                    BitmapEndPointer = nPointer;

                    nPointer = BitmapBeginPointer;
                    var /* int */ b = 0;

                    var /* float[] */ data = [];

                    if (this.DataRepresentationTemplateNumber === 0) { // Grid point data - simple packing
                        data = new Float32Array(this.NumberOfDataPoints);

                        for (var i = 0; i < this.NumberOfDataPoints; i++) {
                            var /* int[] */ m = new Int32Array(this.NumberOfBitsUsedForEachPackedValue);
                            for (var j = 0; j < m.length; j++) {
                                m[j] = getNthBit(this.fileBytes[nPointer], b);
                                b += 1;
                                if (b === 8) {
                                    b = 0;
                                    nPointer += 1;
                                }
                            }
                            data[i] = uNumXI(m);
                        }
                    }

                    if ((this.DataRepresentationTemplateNumber === 2) || // Grid point data - complex packing
                        (this.DataRepresentationTemplateNumber === 3)) { // Grid point data - complex packing and spatial differencing
                        println();
                        println("First value(s) of original (undifferenced) scaled data values, followed by the overall minimum of the differences.");

                        var /* int */ FirstValues1 = 0;
                        var /* int */ FirstValues2 = 0;
                        var /* int */ OverallMinimumOfTheDifferences = 0;

                        {
                            var /* int[] */ m = new Int32Array(8 * ComplexPackingNumberOfExtraOctetsRequiredInDataSection);
                            for (var j = 0; j < m.length; j++) {
                                m[j] = getNthBit(this.fileBytes[nPointer], b);

                                b += 1;
                                if (b === 8) {
                                    b = 0;
                                    nPointer += 1;
                                }
                            }
                            FirstValues1 = sNumXI(m);
                            println("FirstValues1 =", FirstValues1);
                        }

                        if (ComplexPackingOrderOfSpatialDifferencing === 2) { //second order spatial differencing
                            var /* int[] */ m = new Int32Array(8 * ComplexPackingNumberOfExtraOctetsRequiredInDataSection);
                            for (var j = 0; j < m.length; j++) {
                                m[j] = getNthBit(this.fileBytes[nPointer], b);
                                b += 1;
                                if (b === 8) {
                                    b = 0;
                                    nPointer += 1;
                                }
                            }
                            FirstValues2 = sNumXI(m);
                            println("FirstValues2 =", FirstValues2);
                        }

                        {
                            var /* int[] */ m = new Int32Array(8 * ComplexPackingNumberOfExtraOctetsRequiredInDataSection);
                            for (var j = 0; j < m.length; j++) {
                                m[j] = getNthBit(this.fileBytes[nPointer], b);
                                b += 1;
                                if (b === 8) {
                                    b = 0;
                                    nPointer += 1;
                                }
                            }

                            OverallMinimumOfTheDifferences = sNumXI(m);
                            println("OverallMinimumOfTheDifferences =", OverallMinimumOfTheDifferences);
                        }

                        // read the group reference values
                        var /* int[] */ group_refs = new Int32Array(ComplexPackingNumberOfGroupsOfDataValues);

                        for (var i = 0; i < ComplexPackingNumberOfGroupsOfDataValues; i++) {
                            var /* int[] */ m = new Int32Array(this.NumberOfBitsUsedForEachPackedValue);
                            for (var j = 0; j < m.length; j++) {
                                m[j] = getNthBit(this.fileBytes[nPointer], b);
                                b += 1;
                                if (b === 8) {
                                    b = 0;
                                    nPointer += 1;
                                }
                            }
                            group_refs[i] = uNumXI(m);
                        }
                        //println(group_refs);

                        //Bits set to zero shall be appended where necessary to ensure this sequence of numbers ends on an octet boundary.
                        if (b !== 0) {
                            b = 0;
                            nPointer += 1;
                        }

                        // read the group widths
                        var /* int[] */ group_widths = new Int32Array(ComplexPackingNumberOfGroupsOfDataValues);

                        for (var i = 0; i < ComplexPackingNumberOfGroupsOfDataValues; i++) {
                            var /* int[] */ m = new Int32Array(ComplexPackingNumberOfBitsUsedForGroupWidths);
                            for (var j = 0; j < m.length; j++) {
                                m[j] = getNthBit(this.fileBytes[nPointer], b);
                                b += 1;
                                if (b === 8) {
                                    b = 0;
                                    nPointer += 1;
                                }
                            }
                            group_widths[i] = uNumXI(m);

                            group_widths[i] += ComplexPackingReferenceForGroupWidths;
                        }
                        //println(group_widths);

                        //Bits set to zero shall be appended where necessary to ensure this sequence of numbers ends on an octet boundary.
                        if (b !== 0) {
                            b = 0;
                            nPointer += 1;
                        }

                        // read the group lengths
                        var /* int[] */ group_lengths = new Int32Array(ComplexPackingNumberOfGroupsOfDataValues);

                        if (ComplexPackingGroupSplittingMethodUsed === 1) {
                            for (var i = 0; i < ComplexPackingNumberOfGroupsOfDataValues; i++) {
                                var /* int[] */ m = new Int32Array(ComplexPackingNumberOfBitsUsedForTheScaledGroupLengths);
                                for (var j = 0; j < m.length; j++) {
                                    m[j] = getNthBit(this.fileBytes[nPointer], b);
                                    b += 1;
                                    if (b === 8) {
                                        b = 0;
                                        nPointer += 1;
                                    }
                                }
                                group_lengths[i] = uNumXI(m);

                                group_lengths[i] = group_lengths[i] * ComplexPackingLengthIncrementForTheGroupLengths + ComplexPackingReferenceForGroupLengths;
                            }
                            group_lengths[ComplexPackingNumberOfGroupsOfDataValues - 1] = ComplexPackingTrueLengthOfLastGroup;
                        } else {
                            println("Error: It does not support this splitting method:", ComplexPackingGroupSplittingMethodUsed);
                        }
                        //println(group_lengths);

                        //Bits set to zero shall be appended where necessary to ensure this sequence of numbers ends on an octet boundary.
                        if (b !== 0) {
                            b = 0;
                            nPointer += 1;
                        }

                        // check
                        var /* int */ total = 0;
                        for (var i = 0; i < ComplexPackingNumberOfGroupsOfDataValues; i++) {
                            total += group_lengths[i];
                        }
                        if (total !== this.NumberOfDataPoints) {
                            //if (total !== this.Np) {
                            println("Error: Size mismatch!");
                        }

                        data = new Float32Array(total);

                        var /* int */ count = 0;

                        for (var i = 0; i < ComplexPackingNumberOfGroupsOfDataValues; i++) {
                            if (group_widths[i] !== 0) {
                                for (var j = 0; j < group_lengths[i]; j++) {
                                    var /* int[] */ m = new Int32Array(group_widths[i]);
                                    for (var k = 0; k < m.length; k++) {
                                        m[k] = getNthBit(this.fileBytes[nPointer], b);
                                        b += 1;
                                        if (b === 8) {
                                            b = 0;
                                            nPointer += 1;
                                        }
                                    }

                                    data[count] = uNumXI(m) + group_refs[i];

                                    count += 1;
                                }
                            } else {
                                for (var j = 0; j < group_lengths[i]; j++) {
                                    data[count] = group_refs[i];

                                    count += 1;
                                }
                            }
                        }

                        // not sure if this algorithm works fine for complex packing WITHOUT spatial differencing ?????
                        if (this.DataRepresentationTemplateNumber === 3) { // Grid point data - complex packing and spatial differencing
                            // spatial differencing
                            if (ComplexPackingOrderOfSpatialDifferencing === 1) { // case of first order
                                data[0] = FirstValues1;
                                for (var i = 1; i < total; i++) {
                                    data[i] += OverallMinimumOfTheDifferences;
                                    data[i] = data[i] + data[i - 1];
                                }
                            } else if (ComplexPackingOrderOfSpatialDifferencing === 2) { // case of second order
                                data[0] = FirstValues1;
                                data[1] = FirstValues2;
                                for (var i = 2; i < total; i++) {
                                    data[i] += OverallMinimumOfTheDifferences;
                                    data[i] = data[i] + (2 * data[i - 1]) - data[i - 2];
                                }
                            }
                        }
                    }

                    // Mode  0 +x, -y, adjacent x, adjacent rows same dir
                    // Mode  64 +x, +y, adjacent x, adjacent rows same dir
                    if ((this.ScanningMode === 0) || (this.ScanningMode === 64)) {
                        // Mode  128 -x, -y, adjacent x, adjacent rows same dir
                        // Mode  192 -x, +y, adjacent x, adjacent rows same dir
                        // change -x to +x ie east to west -> west to east
                    } else if ((this.ScanningMode === 128) || (this.ScanningMode === 192)) {
                        var /* float */ tmp;
                        var /* int */ mid = int(this.Nx / 2);
                        //println( "this.Nx =" +this.Nx +" mid ="+ mid );
                        for (var index = 0; index < data.length; index += this.Nx) {
                            for (var idx = 0; idx < mid; idx++) {
                                tmp = data[index + idx];
                                data[index + idx] = data[index + this.Nx - idx - 1];
                                data[index + this.Nx - idx - 1] = tmp;
                                //println( "switch " + (index + idx) + " " +
                                //(index + this.Nx -idx -1) );
                            }
                        }
                    } else {
                        // scanMode === 16, 80, 144, 208 adjacent rows scan opposite dir
                        var /* float */ tmp;
                        var /* int */ mid = int(this.Nx / 2);
                        //println( "this.Nx =" +this.Nx +" mid ="+ mid );
                        for (var index = 0; index < data.length; index += this.Nx) {
                            var /* int */ row = int(index / this.Nx);
                            if (row % 2 === 1) {  // odd numbered row, calculate reverse index
                                for (var idx = 0; idx < mid; idx++) {
                                    tmp = data[index + idx];
                                    data[index + idx] = data[index + this.Nx - idx - 1];
                                    data[index + this.Nx - idx - 1] = tmp;
                                    //println( "switch " + (index + idx) + " " +
                                    //(index + this.Nx -idx -1) );
                                }
                            }
                        }
                    }

                    //Bits set to zero shall be appended where necessary to ensure this sequence of numbers ends on an octet boundary.
                    if (b !== 0) {
                        b = 0;
                        nPointer += 1;
                    }

                    nPointer -= 1; // <<<<????

                    var /* float */ BB = Math.pow(2, this.BinaryScaleFactor);
                    var /* float */ DD = Math.pow(10, this.DecimalScaleFactor);
                    var /* float */ RR = this.ReferenceValue;

                    if (this.Bitmap_Indicator === 0) { // A bit map applies to this product
                        var /* int */ i = -1;
                        for (var q = 0; q < this.Nx * this.Ny; q++) {
                            if (this.NullBitmapFlags[q] === 0) {
                                this.DataValues[memberID][q] = undefined;
                            } else {
                                i += 1;

                                this.DataValues[memberID][q] = ((data[i] * BB) + RR) / DD;
                            }
                        }
                    } else {
                        for (var q = 0; q < this.Nx * this.Ny; q++) {
                            var /* int */ i = q;

                            this.DataValues[memberID][q] = ((data[i] * BB) + RR) / DD;
                        }
                    }

                    //for (var q = 0; q < 20; q++) println(this.DataValues[memberID][q]);

                    if (numMembers > 1) {
                        this.DataTitles[memberID] += nf0(memberID, 2);
                    }
                }
            }

            SectionNumbers = this.getGrib2Section(8); // Section 8: 7777

            if (this.DataRepresentationTemplateNumber === 40) { // Grid point data – JPEG 2000 Code Stream Format
                var /* float */ BB = Math.pow(2, this.BinaryScaleFactor);
                var /* float */ DD = Math.pow(10, this.DecimalScaleFactor);
                var /* float */ RR = this.ReferenceValue;

                if (this.Bitmap_Indicator === 0) { // A bit map applies to this product
                    var /* int */ i = -1;
                    for (var q = 0; q < this.Nx * this.Ny; q++) {
                        if (this.NullBitmapFlags[q] === 0) {
                            this.DataValues[memberID][q] = undefined;
                        } else {
                            i += 1;

                            this.DataValues[memberID][q] = ((this.data[i] * BB) + RR) / DD;
                        }
                    }
                } else {
                    for (var q = 0; q < this.Nx * this.Ny; q++) {
                        var /* int */ i = q;

                        this.DataValues[memberID][q] = ((this.data[i] * BB) + RR) / DD;
                    }
                }
            }
        }
    };

    this.parse = function (bytes) {
        this.fileBytes = bytes;

        this.readGrib2Members(numMembers);
    };

    this._toLongitudeLatitude = function (ix, iy) {
        var lon, lat;

        var lat1 = this.La1;
        var lon1 = this.Lo1;

        var lat2 = this.La2;
        var lon2 = this.Lo2;

        lon = ix * (lon2 - lon1) / float(this.Nx) + lon1;
        lat = iy * (lat2 - lat1) / float(this.Ny) + lat1;

        return [lon, lat];
    };

    this._toRotatedLongitudeLatitude = function (ix, iy) {
        var lon, lat;

        var lat1 = this.La1;
        var lon1 = this.Lo1;

        var lat2 = this.La2;
        var lon2 = this.Lo2;

        lon = ix * (lon2 - lon1) / float(this.Nx) + lon1;
        lat = iy * (lat2 - lat1) / float(this.Ny) + lat1;

        var t1 = this.SouthLon;
        var t2 = -this.SouthLat - 90;
        var t3 = this.Rotation - 90;

        var x = cosDeg(lat) * cosDeg(lon);
        var y = cosDeg(lat) * sinDeg(lon);
        var z = sinDeg(lat);

        var t;

        t = -t3;
        {
            var tmp_x = x * cosDeg(t) - y * sinDeg(t);
            var tmp_y = y * cosDeg(t) + x * sinDeg(t);
            var tmp_z = z;
            x = tmp_x;
            y = tmp_y;
            z = tmp_z;
        }

        t = -t2;
        {
            var tmp_y = y * cosDeg(t) - z * sinDeg(t);
            var tmp_z = z * cosDeg(t) + y * sinDeg(t);
            var tmp_x = x;
            x = tmp_x;
            y = tmp_y;
            z = tmp_z;
        }

        t = -t1;
        {
            var tmp_x = x * cosDeg(t) - y * sinDeg(t);
            var tmp_y = y * cosDeg(t) + x * sinDeg(t);
            var tmp_z = z;
            x = tmp_x;
            y = tmp_y;
            z = tmp_z;
        }

        lat = asinDeg(z);
        lon = atan2Deg(y, x);

        if (lon < lon1) lon += 360;
        else if (lon > lon2) lon -= 360;

        return [lon, lat];
    };

    this._toPolarStereographic = function (ix, iy) {
        var lon, lat;

        var Lat1 = this.La1;
        var Lon1 = this.Lo1;

        var LatD = this.LaD;
        var LonV = this.LoV;

        var dx = this.Dx;
        var dy = this.Dy;

        if (this.ScanX == 0) dx = -dx;
        if (this.ScanY == 0) dy = -dy;

        var h = 1.0;
        if (this.PCF != 0) {
            h = -1.0;
            LonV -= 180;
        }

        var de = (1.0 + sinDeg(Math.abs(LatD))) * rEarthKm;
        var dr = de * cosDeg(Lat1) / (1 + h * sinDeg(Lat1));

        var xp = -h * (sinDeg(Lon1 - LonV)) * dr / dx;
        var yp = (cosDeg(Lon1 - LonV)) * dr / dy;

        var de2 = de * de;

        var di = (ix - xp) * dx;
        var dj = (-iy - yp) * dy;
        var dr2 = di * di + dj * dj;

        lat = h * asinDeg((de2 - dr2) / (de2 + dr2));
        lon = LonV + h * atan2Deg(di, -dj);

        lon = (lon + 360) % 360;
        if (lon > 180) lon -= 360;

        return [lon, lat];
    };

    this._toLambertConformal = function (ix, iy) {
        var lon, lat;

        var Lat1 = this.La1;
        var Lon1 = this.Lo1;

        var LatD = this.LaD;
        var LonV = this.LoV;

        var dx = this.Dx;
        var dy = this.Dy;

        if (this.ScanX == 0) dx = -dx;
        if (this.ScanY == 0) dy = -dy;

        var h = 1.0;
        if (this.PCF != 0) {
            h = -1.0;
            LonV -= 180;
        }

        var latin1r = this.FirstLatIn;
        var latin2r = this.SecondLatIn;

        var n = 0;
        if (Math.abs(latin1r - latin2r) < 0.000000001) {
            n = sinDeg(latin1r);
        } else {
            n = Math.log(cosDeg(latin1r) / cosDeg(latin2r)) / Math.log(tanDeg(45 + 0.5 * latin2r) / tanDeg(45 + 0.5 * latin1r));
        }

        var f = (cosDeg(latin1r) * Math.pow(tanDeg(45 + 0.5 * latin1r), n)) / n;

        var rho_ooo = rEarthKm * f * Math.pow(tanDeg(45 + 0.5 * Lat1), -n);
        var rho_ref = rEarthKm * f * Math.pow(tanDeg(45 + 0.5 * LatD), -n);

        var d_lon = Lon1 - LonV;

        var theta_ooo = n * d_lon;

        var startx = rho_ooo * sinDeg(theta_ooo);
        var starty = rho_ref - rho_ooo * cosDeg(theta_ooo);

        var y = starty - iy * dy;
        var tmp = rho_ref - y;

        var x = startx + ix * dx;
        var theta_new = atan2Deg(x, tmp);
        var rho_new = sqrt(x * x + tmp * tmp);
        if (n < 0) rho_new *= -1;

        lat = 2.0 * atanDeg(Math.pow(rEarthKm * f / rho_new, 1.0 / n)) - 90;
        lon = LonV + theta_new / n;

        lon = (lon + 360) % 360;
        if (lon > 180) lon -= 360;

        return [lon, lat];
    };

    this.getLonLat = function (ix, iy) {
        if (this.TypeOfProjection === 0) { // Latitude/longitude
            return this._toLongitudeLatitude(ix, iy);
        }

        if (this.TypeOfProjection === 1) { // Rotated latitude/longitude
            return this._toRotatedLongitudeLatitude(ix, iy);
        }

        if (this.TypeOfProjection === 20) { // Polar Stereographic Projection
            return this._toPolarStereographic(ix, iy);
        }

        if (this.TypeOfProjection === 30) { // Lambert Conformal Projection
            return this._toLambertConformal(ix, iy);
        }

        return [undefined, undefined];
    };
};

function asinDeg (a) {
    return ((Math.asin(a)) * 180 / Math.PI);
}

function atanDeg (a) {
    return ((Math.atan(a)) * 180 / Math.PI);
}

function atan2Deg (a, b) {
    return ((Math.atan2(a, b)) * 180 / Math.PI);
}

function sinDeg (a) {
    return Math.sin(a * Math.PI / 180);
}

function cosDeg (a) {
    return Math.cos(a * Math.PI / 180);
}

function tanDeg (a) {
    return Math.tan(a * Math.PI / 180);
}

function float (i) { // not needed in JS; but added for clarity and make the code portable to other languages.
    return i * 1.0;
}

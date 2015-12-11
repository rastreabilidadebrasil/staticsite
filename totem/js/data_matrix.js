(function(global) {
    var _dataMatrix = global.dataMatrix;
    global.dataMatrix = {};
    global.dataMatrix.FIXED_FIELD_LENGTH = {
        "00" : 20,
        "01" : 16,
        "02" : 16,
        "03" : 16,
        "04" : 18,
        "11" : 8,
        "12" : 8,
        "13" : 8,
        "14" : 8,
        "15" : 8,
        "16" : 8,
        "17" : 8,
        "18" : 8,
        "19" : 8,
        "20" : 4,
        "31" : 10,
        "32" : 10,
        "33" : 10,
        "34" : 10,
        "35" : 10,
        "36" : 10,
        "41" : 16
    };

    global.dataMatrix.CODE_LENGTHS_BY_PREFIX = {
        "00" : 02,
        "01" : 02,
        "02" : 02,
        "10" : 02,
        "11" : 02,
        "12" : 02,
        "13" : 02,
        "15" : 02,
        "17" : 02,
        "20" : 02,
        "21" : 02,
        "30" : 02,
        "37" : 02,
        "90" : 02,
        "90" : 02,
        "91" : 02,
        "92" : 02,
        "93" : 02,
        "94" : 02,
        "95" : 02,
        "96" : 02,
        "97" : 02,
        "98" : 02,
        "99" : 02,
        "70" : 04,
        "80" : 04
    };

    global.dataMatrix.ANVISA_NUMBER_MAX_LENGTH = 20

    global.dataMatrix.SERIAL_NUMBER_MAX_LENGTH = 20

    global.dataMatrix.BATCH_CODE_MAX_LENGTH = 20

    global.dataMatrix.DEFAULT_COMMON_SEPARATOR = "}[{-}]{";

    global.dataMatrix.DEFAULT_ASCII_SEPARATOR_CODE = 29;

    global.dataMatrix.splitFirstCode=function(dataMatrixString) {
        var codePrefix = dataMatrixString.substring(0, 2);
        var codeLength = this.CODE_LENGTHS_BY_PREFIX[codePrefix] || 3;
        return {
            code : dataMatrixString.substring(0, codeLength),
            tail : dataMatrixString.substring(codeLength)
        };
    };

    /**
     * 
     * @param code
     * @returns -1 for a invalid code, 0 for variable field code, > 0 for a
     *          fixed length code
     */
    global.dataMatrix.getFieldLength=function(code) {
        var result;
        if (!code) {
            result = -1
        } else {
            var codePrefix = code.substring(0, 2);
            result = this.FIXED_FIELD_LENGTH[codePrefix] != null ? this.FIXED_FIELD_LENGTH[codePrefix] - code.length : 0;
        }
        return result;
    };

    global.dataMatrix.normalizeDataMatrix=function(dataMatrixString, commonSeparator) {
        dataMatrixString = dataMatrixString.indexOf(commonSeparator) === 0 ? dataMatrixString.substring(commonSeparator.length) : dataMatrixString;
        return dataMatrixString.trim();
    };
    

    global.dataMatrix.parseDataMatrix=function(dataMatrixString, commonSeparator) {
        commonSeparator = this.commonSeparator == null ? this.DEFAULT_COMMON_SEPARATOR : commonSeparator;
        dataMatrixString = this.normalizeDataMatrix(dataMatrixString, commonSeparator);
        var resultObject = {};
        this.getDataMatrixFields(dataMatrixString, commonSeparator, resultObject);
        return resultObject;
    };
    

    global.dataMatrix.getDataMatrixFields=function(dataMatrixString, commonSeparator, resultObject) {
        if (!dataMatrixString) {
            return;
        }
        var codeSplited = this.splitFirstCode(dataMatrixString);
        var fieldLength = this.getFieldLength(codeSplited.code);
        if (fieldLength === 0) {
            splitedDataMatrix = codeSplited.tail.split(commonSeparator);
            resultObject[codeSplited.code] = splitedDataMatrix[0];
            this.getDataMatrixFields(codeSplited.tail.substring(splitedDataMatrix[0].length + commonSeparator.length), commonSeparator, resultObject);
        } else {
            resultObject[codeSplited.code] = codeSplited.tail.substring(0, fieldLength);
            this.getDataMatrixFields(codeSplited.tail.substring(fieldLength), commonSeparator, resultObject);
        }
    };
    

    global.dataMatrix.toRBIum=function(parsedDataMatrix) {
        return parsedDataMatrix["713"] + parsedDataMatrix["21"] + parsedDataMatrix["17"].substring(0,4) + parsedDataMatrix["10"];
    };

    global.dataMatrix.toRBDataMatrixString=function(anvisa, serial, date, batch, commonSeparator) {
        var sep = commonSeparator || this.DEFAULT_COMMON_SEPARATOR;
        return "713" + anvisa + sep + "21" + serial + sep + "17" + date + "10" + batch;
    };

    global.dataMatrix.isRBIum=function(parsedDataMatrix) {
        return parsedDataMatrix["713"] && parsedDataMatrix["21"] && parsedDataMatrix["17"] && parsedDataMatrix["10"];
    };

    global.dataMatrix.isInteger=function(numString) {
        var regex = /^([0-9])$/i;
        return !!numString.match(regex);
    };

    global.dataMatrix.isAlphanumeric=function(numString) {
        // Match one character
        var regex = /[^0-9a-z]/i;
        return !(numString).match(regex);
    };

    global.dataMatrix.validateAnvisaNumber=function(anvisaString) {
        return anvisaString.length && anvisaString.length <= this.ANVISA_NUMBER_MAX_LENGTH && this.isAlphanumeric(anvisaString);
    };

    global.dataMatrix.validateSerialNumber=function(serialString) {
        return serialString.length && serialString.length <= this.SERIAL_NUMBER_MAX_LENGTH && this;isAlphanumeric(serialString);
    };

    global.dataMatrix.validateDateString=function(dateString) {
        try {
            var year = window.parseInt(dateString.substring(0, 2),10);
            var month = window.parseInt(dateString.substring(2, 4),10);
            var day = window.parseInt(dateString.substring(4, 6),10);
            return (dateString.length === 6) && (year >= 0 && year < 100) && (month > 0 && month <= 12) && (day >=0 && day<=31);
        } catch (e) {
            return false;
        }
    };

    global.dataMatrix.validateBatchCode=function(batchString) {
        return batchString.length && batchString.length <= this.BATCH_CODE_MAX_LENGTH && this.isAlphanumeric(batchString);
    };
    global.dataMatrix.validateRBFields=function(anvisaString,serialString,dateString,batchString){
        var result = false;
        if(!this.validateAnvisaNumber(anvisaString)){
            result = "Registro da anvisa invalido";
        }else if(!this.validateSerialNumber(serialString)){
            result = "Numero serial invalido";
        }else if(!this.validateDateString(dateString)){
            result = "Formato de data invalido";
        }else if(!this.validateBatchCode(batchString)){
            result = "Numero do lote invalido";
        }
        return result;
    }
    var local = global.dataMatrix;
    local.noConflict = function() {
        typeof _dataMatrix === 'undefined' ? delete global.dataMatrix
                : global.dataMatrix = _dataMatrix;
        return local;
    };
})(this)
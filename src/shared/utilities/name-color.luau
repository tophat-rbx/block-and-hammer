local nameColors = {
	Color3.fromRGB(253, 41, 67),
	Color3.fromRGB(41, 112, 253),
	Color3.fromRGB(41, 253, 73),
	Color3.fromRGB(253, 41, 161),
	Color3.fromRGB(253, 129, 41),
	Color3.fromRGB(221, 253, 41),
	Color3.fromRGB(253, 41, 87),
	Color3.fromRGB(253, 225, 41),
}

local function getNameValue(pName)
	local value = 0
	
	for index = 1, #pName do
		local cValue = string.byte(string.sub(pName, index, index))
		local reverseIndex = #pName - index + 1
		
		if #pName % 2 == 1 then
			reverseIndex = reverseIndex - 1
		end
		
		if reverseIndex % 4 >= 2 then
			cValue = -cValue
		end
		
		value = value + cValue
	end
	
	return value
end

local function computeNameColor(pName)
	local index = (getNameValue(pName) % #nameColors) + 1
	
	return nameColors[index]
end

return computeNameColor

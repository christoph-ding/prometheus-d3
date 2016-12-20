// munge the data
export const groupByKey = ({list, key}) => {
  const groupedHash = {};
  const groupedArray = [];

  list.map((item)=>{
    const targetKey = item[key] === "" ? 'Not Available': item[key];
    if (!(item[key] in groupedHash)) {
      groupedHash[targetKey] = [];      
    }
    groupedHash[targetKey].push(item);
  });

  for (var keyCategory in groupedHash) {
    const category = {
      name: keyCategory,
      data: groupedHash[keyCategory]
    }
    groupedArray.push(category);
  }

  return groupedArray;
}

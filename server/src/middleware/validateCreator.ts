const projectModel = require('../models/project.model')

async function validateCre(userId: string, projectId: string): Promise<Boolean> {

    
    projectModel.findOne(
        {
            _id: projectId
        },
        (error: any, result: any) => {
            if(error){
                return false
            }
            if(!result) return false;
            if(result.creator == userId) return true
            else return false 
        }
    )

    return false
}

module.exports = validateCre
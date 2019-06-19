export class Exam {
    constructor(
        public startDate:Date,
        public endDate:Date,
        public teacher:Number,
        public course:String,
        public numOfHardQ:Number,
        public numOfEasyQ:Number,
        public numOfNormalQ:Number,
        public questions 
    ){}
}

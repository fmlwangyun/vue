var _ = require("underscore");
export const Enums = {
  Positions: {
    None: {
      Description: '无职称',
      Value: "0"
    },
    Director: {
      Description: '主任',
      Value: "1"
    },
    DeputyDirector: {
      Description: '副主任',
      Value: "2"
    },
    AttendingDoctor: {
      Description: '主治医师',
      Value: "3"
    },
    ResidentPhysician: {
      Description: '住院医师',
      Value: "4"
    },
    Nurse: {
      Description: '护士',
      Value: "5"
    }
  },
  WechatUserStatus: {
    None: {
      Description: '未注册',
      Value: 0
    },
    Registered: {
      Description: '已注册',
      Value: 1
    }
  },
  ExamType: {
    Exam: {
      Description: '考试',
      Value: 0
    },
    Survey: {
      Description: '调研',
      Value: 1
    }
  },
  QuestionType: {
    Radio: {
      Description: '单选',
      Value: 0
    },
    CheckBox: {
      Description: '多选',
      Value: 1
    },
    Select: {
      Description: '下拉选择',
      Value: 2
    },
    Text: {
      Description: '单行问答',
      Value: 3
    },
    TextArea: {
      Description: '多行问答',
      Value: 4
    },
    Upload: {
      Description: '上传',
      Value: 5
    },
  },
  GetDescription(t, v) {
    var ed = '';
    _.find(t, function (i, d) {
      if (v == i.Value) {
        ed = i.Description;
        return true;
      }
    })
    return ed;
  },
  GetList(t) {
    var list = [];
    _.each(t, function (i, d) {
      let j = {name: i.Description, value: i.Value};
      list.push(j)
    })
    return list;
  }
}


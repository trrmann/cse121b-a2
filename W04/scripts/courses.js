// courses.js
const aCourse = {
    code: "CSE121b",
    name: "Javascript Language",
    sections: [{ sectionNum: 1, roomNum: 'STC 353', enrolled: 26, days: 'TTh', instructor: 'Bro T'}, { sectionNum: 2, roomNum: 'STC 347', enrolled: 28, days: 'TTh', instructor: 'Sis A'}],
    deltaEnrolled : function (sectionNum, enroll=true) {
        let index = this.sections.findIndex((section) => section.sectionNum == sectionNum);
        if(index > -1) {
            if (enroll) {
                this.sections[index].enrolled++;
            } else {
                if (this.sections[index].enrolled > 0) {
                    this.sections[index].enrolled--;
                }
            }
        }
        renderSections(this.sections);
    },
    enrollStudent : function (sectionNum) {this.deltaEnrolled(sectionNum)},
    dropStudent : function (sectionNum) {this.deltaEnrolled(sectionNum, false)}
};

function setCourseInfo(course) {
    document.querySelector('#courseName').innerText = course.name;
    document.querySelector('#courseCode').innerText = course.code;
}

function renderSections(sections) {
    document.querySelector('#sectionsTable').innerHTML = sections.map((section) => {
        const sectionNumTd = document.createElement('td');
        sectionNumTd.innerText = section.sectionNum;
        const roomNumTd = document.createElement('td');
        roomNumTd.innerText = section.roomNum;
        const enrollCountTd = document.createElement('td');
        enrollCountTd.innerText = section.enrolled;
        const classDaysTd = document.createElement('td');
        classDaysTd.innerText = section.days;
        const instructorTd = document.createElement('td');
        instructorTd.innerText = section.instructor;
        const tr = document.createElement('tr');
        tr.appendChild(sectionNumTd);
        tr.appendChild(roomNumTd);
        tr.appendChild(enrollCountTd);
        tr.appendChild(classDaysTd);
        tr.appendChild(instructorTd);
        return tr.outerHTML;
    }).join('');
}

document.querySelector("#enrollStudent").addEventListener("click", function () {
    const sectionNum = document.querySelector("#sectionNumber").value;
    aCourse.enrollStudent(sectionNum);
  });

document.querySelector("#dropStudent").addEventListener("click", function () {
    const sectionNum = document.querySelector("#sectionNumber").value;
    aCourse.dropStudent(sectionNum);
});
  
setCourseInfo(aCourse);
renderSections(aCourse.sections);
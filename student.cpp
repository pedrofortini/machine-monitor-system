class Student {

	char* name;
	char* courseName;
	std::string toString() { return std::string(name); }
}

std::string FindCourseName ( std::list< Student > stu, string name ) {

	for ( std::list< Student >::iterator it = stu.begin(); it != stu.end();it++) {
		if ( (*it).toString() == name ) {
			return it->courseName; }
		} 

	return "";
}
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
  private courses: Array<Course> = [
    {
      id: 1,
      name: 'Fundamentos do Framework',
      description: 'Curso de Nest.js',
      tags: ['node.js', 'nest.js', 'javascript'],
    },
  ];

  private getCourseById(id: number): Course {
    const index = this.getIndexById(id);
    if (index < 0) {
      throw new HttpException(
        `Course ${id} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }
    return this.courses[index];
  }

  private getIndexById(id: number): number {
    return this.courses.findIndex((course) => course.id === id);
  }

  findAll() {
    return this.courses;
  }

  findById(id: string) {
    return this.getCourseById(Number(id));
  }

  create(createCourseDto: any) {
    this.courses.push(createCourseDto);
  }

  update(id: string, udpateCourseDto: any) {
    const index = this.getIndexById(Number(id));
    this.courses[index] = udpateCourseDto;
    return this.courses[index];
  }

  remove(id: string) {
    const index = this.getIndexById(Number(id));

    if (index < 0) {
      return null;
    }

    this.courses.splice(index, 1);
  }
}
